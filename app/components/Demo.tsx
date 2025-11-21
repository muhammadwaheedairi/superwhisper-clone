'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, MoreVertical, Mic, Sparkles, Wand2, Copy, RotateCw } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

export const Demo: React.FC = () => {
  // Mode State
  const [mode, setMode] = useState<'video' | 'interactive'>('video');

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [duration] = useState(73); // 1:13 duration
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Interactive State
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Audio Streaming Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sessionRef = useRef<any>(null);

  // Video Logic
  useEffect(() => {
    let interval: number;
    if (isPlaying && mode === 'video') {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, mode]);

  // Cleanup audio resources on unmount or mode switch
  useEffect(() => {
    return () => {
      stopAudioStream();
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      setCurrentTime(percentage * duration);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  // --- Audio Helper Functions ---
  const createBlob = (data: Float32Array): { data: string; mimeType: string } => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      // Clamp values to [-1, 1] before scaling
      const s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    // Manual binary to base64 string conversion for performance
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const stopAudioStream = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (sessionRef.current) {
        sessionRef.current = null;
    }
    setIsListening(false);
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      stopAudioStream();
      return;
    }

    try {
        setIsListening(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        // Initialize Audio Context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass({ sampleRate: 16000 });
        audioContextRef.current = audioContext;

        // Connect to Gemini Live
        // We use the sessionPromise pattern to ensure we don't have a race condition
        // where the callbacks try to use 'session' before it's assigned.
        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                // Enable transcription for user input audio.
                // IMPORTANT: This must be an empty object to use default/session model settings.
                inputAudioTranscription: {}, 
                systemInstruction: "You are a helpful transcription assistant. Your only job is to listen. Do not speak back.",
            },
            callbacks: {
                onopen: async () => {
                    console.log("Gemini Live Connected");
                    // Get Microphone Stream
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        audio: {
                            sampleRate: 16000,
                            channelCount: 1,
                        } 
                    });
                    streamRef.current = stream;
                    
                    const source = audioContext.createMediaStreamSource(stream);
                    sourceRef.current = source;

                    // Process Audio
                    const processor = audioContext.createScriptProcessor(4096, 1, 1);
                    processorRef.current = processor;

                    processor.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        
                        // Send audio chunk using the promise to guarantee session availability
                        sessionPromise.then(session => {
                            session.sendRealtimeInput({ media: pcmBlob });
                        });
                    };

                    source.connect(processor);
                    processor.connect(audioContext.destination);
                },
                onmessage: (message: LiveServerMessage) => {
                    // Handle Transcription
                    if (message.serverContent?.inputTranscription) {
                        const text = message.serverContent.inputTranscription.text;
                        if (text) {
                            setInputText((prev) => prev + text);
                        }
                    }
                    // We ignore model audio output (Modality.AUDIO) for this specific demo
                    // as we want a "Dictation" experience, not a conversation.
                },
                onclose: () => {
                    console.log("Gemini Live Disconnected");
                    setIsListening(false);
                },
                onerror: (err) => {
                    console.error("Gemini Live Error:", err);
                    setIsListening(false);
                }
            }
        });
        
        sessionRef.current = await sessionPromise;

    } catch (error) {
        console.error("Failed to start voice input:", error);
        setIsListening(false);
        alert("Could not access microphone or connect to AI service.");
    }
  };

  // Interactive Logic - Rewrite
  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setOutputText(''); // Clear previous output

    try {
        // Direct Client-Side Call
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are Superwhisper, an advanced AI voice-to-text assistant. 
          The user has provided a rough transcript or draft. 
          Rewrite the following text to be professional, concise, and clear. 
          Do not add any conversational filler. Just output the rewritten text.
          
          Input text: "${inputText}"`,
        });
        
        const rewrittenText = response.text || "Could not generate a response.";
        setOutputText(rewrittenText);

    } catch (error) {
      console.error("Error calling rewrite API:", error);
      setOutputText("Error connecting to the AI service.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  };

  return (
    <section className="py-24 px-6 flex flex-col items-center justify-center bg-black">
      {/* Header & Toggle */}
      <div className="mb-12 flex flex-col items-center gap-6">
        <span className="px-4 py-1 rounded-full border border-white/10 text-sm text-zinc-400 bg-white/5">
          Demo
        </span>
        
        <div className="p-1 bg-zinc-900/50 rounded-full border border-white/10 flex items-center gap-1 relative backdrop-blur-sm">
           <button 
             onClick={() => { setMode('video'); setIsPlaying(false); stopAudioStream(); }}
             className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${mode === 'video' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
           >
             Video Tour
           </button>
           <button 
             onClick={() => { setMode('interactive'); setIsPlaying(false); }}
             className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${mode === 'interactive' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
           >
             <Sparkles size={14} />
             Interactive
           </button>
           
           {/* Sliding Background */}
           <div 
             className={`absolute top-1 bottom-1 rounded-full bg-white shadow-lg transition-all duration-300 ease-out ${mode === 'video' ? 'left-1 w-[calc(50%-4px)]' : 'left-[50%] w-[calc(50%-4px)]'}`}
           />
        </div>
      </div>

      <div className="relative w-full max-w-5xl aspect-video bg-[#080808] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group select-none">
        
        {mode === 'video' ? (
          <>
            {/* Video Display Area */}
            <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-black overflow-hidden">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-white/5 blur-[120px] rounded-full opacity-60 transition-all duration-[2000ms] ${isPlaying ? 'scale-110 opacity-70' : 'scale-100 opacity-60'}`}></div>
                    <div className={`absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-zinc-800/20 blur-[80px] rounded-full mix-blend-overlay transition-transform duration-[3000ms] ${isPlaying ? 'translate-x-10' : 'translate-x-0'}`}></div>
                    <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>

                {/* Presenter Bubble */}
                <div className="absolute bottom-20 right-6 md:bottom-24 md:right-10 w-28 h-36 md:w-40 md:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20 bg-zinc-900">
                    <img 
                        src="/me.jpg" 
                        alt="Presenter"
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
                </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <button 
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] pointer-events-auto"
                >
                    <Play size={32} className="ml-1 text-black fill-black" />
                </button>
                </div>
            )}

            {/* Controls Overlay */}
            <div className={`absolute inset-x-0 bottom-0 p-6 md:p-8 z-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-32 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-24 md:bottom-28 text-center w-full px-4 pointer-events-none">
                    <span className={`inline-block bg-black/40 text-zinc-200 px-4 py-2 rounded-lg backdrop-blur-md text-lg md:text-xl font-medium shadow-lg transition-all duration-500 ${isPlaying ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                        Hey, I want to show you a demo of Superwhisper
                    </span>
                </div>

                <div className="flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                    <div 
                        ref={progressBarRef}
                        className="w-full h-5 relative group/bar cursor-pointer flex items-center"
                        onClick={handleSeek}
                    >
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-white/20"></div>
                        </div>
                        <div 
                            className="absolute left-0 h-1 bg-white rounded-full z-10 pointer-events-none"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                        <div 
                            className={`absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-transform duration-200 z-20 pointer-events-none ${isPlaying || progressPercent > 0 ? 'scale-100' : 'scale-0'} group-hover/bar:scale-100`}
                            style={{ left: `${progressPercent}%`, transform: `translateX(-50%)` }}
                        ></div>
                    </div>

                    <div className="flex items-center justify-between -mt-2">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="text-zinc-200 hover:text-white transition-colors">
                                {isPlaying ? <Pause size={20} fill="currentColor" className="text-white" /> : <Play size={20} fill="currentColor" className="text-white" />}
                            </button>
                            <div className="text-xs font-medium text-zinc-400 font-mono tracking-wider select-none">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-5 text-zinc-400">
                            <button onClick={toggleMute} className="hover:text-white transition-colors">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <button className="hover:text-white transition-colors"><Maximize2 size={20} /></button>
                            <button className="hover:text-white transition-colors"><MoreVertical size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
          </>
        ) : (
          /* INTERACTIVE MODE */
          <div className="absolute inset-0 bg-[#080808] flex flex-col md:flex-row overflow-hidden">
            {/* Input Section */}
            <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col relative bg-gradient-to-b from-zinc-900/20 to-transparent">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-zinc-400 font-medium flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Mic size={14} /> Input
                 </h3>
                 {inputText && (
                    <button onClick={() => setInputText('')} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                        Clear
                    </button>
                 )}
               </div>
               
               <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tap the microphone to speak, or type a rough draft here..."
                  className="flex-1 bg-transparent resize-none outline-none text-lg md:text-xl text-white placeholder-zinc-700 font-medium leading-relaxed p-0 scrollbar-hide"
               />
               
               <div className="mt-6 flex items-center justify-between">
                   {/* Mic Button */}
                  <button 
                    onClick={handleVoiceInput}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-110' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}
                    title={isListening ? "Stop Recording" : "Start Dictation"}
                  >
                    {isListening ? (
                        <span className="w-4 h-4 bg-white rounded-sm animate-pulse"></span>
                    ) : (
                        <Mic size={20} />
                    )}
                  </button>
                  
                  <button 
                    onClick={handleRewrite}
                    disabled={!inputText.trim() || isProcessing}
                    className="group px-6 py-3 bg-white text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {isProcessing ? (
                        <>
                         <RotateCw size={16} className="animate-spin" /> Rewrite
                        </>
                    ) : (
                        <>
                         <Wand2 size={16} className="transition-transform group-hover:rotate-12" /> Superwhisper It
                        </>
                    )}
                  </button>
               </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 p-6 md:p-8 bg-zinc-950/50 flex flex-col relative">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-blue-400 font-medium flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Sparkles size={14} /> Output
                 </h3>
                 {outputText && (
                     <button 
                        onClick={copyToClipboard}
                        className="text-xs flex items-center gap-1 text-zinc-500 hover:text-white transition-colors"
                     >
                        <Copy size={12} /> Copy
                     </button>
                 )}
               </div>

               <div className="flex-1 relative rounded-xl bg-zinc-900/30 border border-white/5 p-6 overflow-y-auto">
                   {isProcessing ? (
                       <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-zinc-500">
                           <div className="flex gap-1">
                               <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                               <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                               <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                           </div>
                           <span className="text-sm font-medium animate-pulse">Polishing your thoughts...</span>
                       </div>
                   ) : outputText ? (
                       <div className="text-lg md:text-xl text-white leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-2 duration-500">
                          {outputText}
                       </div>
                   ) : (
                       <div className="h-full flex flex-col items-center justify-center text-zinc-700 gap-3 select-none">
                           <Wand2 size={32} className="opacity-20" />
                           <p className="text-sm font-medium">AI output will appear here</p>
                       </div>
                   )}
               </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};