"use client";

import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Pin, Clock } from "lucide-react";

const DISCUSSIONS = [
  { title: "Optimal approach for Week 1 Day 5?", author: "CodeMaster", replies: 24, upvotes: 156, pinned: true, time: "2h ago" },
  { title: "Cannot pass testcase 42 on Binary Search", author: "AlgoNinja", replies: 8, upvotes: 32, pinned: false, time: "4h ago" },
  { title: "Is it better to use BFS or DFS here?", author: "DebugKing", replies: 15, upvotes: 89, pinned: false, time: "5h ago" },
  { title: "Alternative solution using bit manipulation", author: "ByteQueen", replies: 42, upvotes: 310, pinned: false, time: "1d ago" },
];

export function Forum() {
  return (
    <section id="forum" className="relative py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 font-outfit uppercase tracking-wider"
            >
              The Analysis <span className="text-gold">Room</span>
            </motion.h2>
            <p className="text-white/60 max-w-2xl">Chess players analyze games. Coders analyze solutions. Discuss strategies, hints, and approaches.</p>
          </div>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
            <MessageSquare size={18} /> New Thread
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {DISCUSSIONS.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-5 hover:bg-white/5 transition-colors cursor-pointer border-l-4 ${topic.pinned ? 'border-l-gold' : 'border-l-transparent'}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {topic.pinned && <Pin size={14} className="text-gold" />}
                      <h4 className="font-bold text-lg text-white/90 hover:text-gold transition-colors">{topic.title}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="text-gold/80">@{topic.author}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {topic.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-white/50">
                    <div className="flex flex-col items-center group">
                      <MessageSquare size={18} className="group-hover:text-white mb-1 transition-colors" />
                      <span className="text-xs font-mono">{topic.replies}</span>
                    </div>
                    <div className="flex flex-col items-center group">
                      <ThumbsUp size={18} className="group-hover:text-gold mb-1 transition-colors" />
                      <span className="text-xs font-mono">{topic.upvotes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['#dp', '#graphs', '#week1', '#two-pointers', '#hints', '#contest'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/70 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 border border-gold/30 bg-gold/5">
              <h3 className="text-lg font-bold mb-2 text-gold flex items-center gap-2">
                <span>♛</span> Grandmaster Tip
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Before jumping into code, write down the logic on paper. A clear strategy saves hours of debugging. Treat every problem like a chess puzzle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
