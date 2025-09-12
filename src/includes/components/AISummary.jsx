import React from "react";

export default function AISummary({ summary }) {
  return (
    <div className="rainbowSlideAnimateBox">
      <div id="ai-summary-bg" className="rainbowSlideAnimate rainbowSlideAnimateBg" />
      <div id="ai-summary-animate" className="rainbowSlideAnimate">
        <div className="rainbowSlideAnimateContainer space-y-2">
          <h2 className="text-lg font-bold rainbowSlideAnimateTitle">AI 总结</h2>
          <div>
            <span id="ai-summary" className="text-sm text-gray-500"></span>
          </div>
        </div>
      </div>
      <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const aiSummaryBg = document.getElementById('ai-summary-bg');
          const aiSummaryAnimate = document.getElementById('ai-summary-animate');
          const typed = new Typed('#ai-summary', {
            strings: ['${summary}'],
            typeSpeed: 50,
            loop: false,
            showCursor: false,
            onBegin: () => {
              aiSummaryBg.classList.add('animate');
              aiSummaryAnimate.classList.add('animate');
            },
            onComplete: () => {
              aiSummaryBg.classList.remove('animate');
              aiSummaryAnimate.classList.remove('animate');
            }
          });
        });
      ` }} />
    </div>
  )
}