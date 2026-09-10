import React from 'react';
import { AITool } from '../types';

interface ComparisonMatrixProps {
  activeTools: AITool[];
  highlightDifferences: boolean;
  onRemoveTool: (id: string) => void;
  onOpenAddTool: () => void;
  onSelectToolForDetails?: (tool: AITool) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  activeTools,
  highlightDifferences,
  onRemoveTool,
  onOpenAddTool,
}) => {
  // Theme helpers for tool badges and icons
  const getThemeStyles = (colorTheme: string) => {
    switch (colorTheme) {
      case 'tertiary':
        return {
          iconBg: 'bg-[#b76dff]/20 text-[#ddb7ff]',
          badgeBg: 'bg-[#272a31] text-[#ddb7ff]',
          accentText: 'text-[#ddb7ff]',
          barColor: 'bg-[#ddb7ff]',
          starColor: 'text-[#ddb7ff]',
        };
      case 'secondary':
        return {
          iconBg: 'bg-[#00a6e0]/20 text-[#7bd0ff]',
          badgeBg: 'bg-[#272a31] text-[#7bd0ff]',
          accentText: 'text-[#7bd0ff]',
          barColor: 'bg-[#7bd0ff]',
          starColor: 'text-[#7bd0ff]',
        };
      case 'primary':
        return {
          iconBg: 'bg-[#8083ff]/20 text-[#c0c1ff]',
          badgeBg: 'bg-[#272a31] text-[#c0c1ff]',
          accentText: 'text-[#c0c1ff]',
          barColor: 'bg-[#c0c1ff]',
          starColor: 'text-[#c0c1ff]',
        };
      case 'secondary-fixed':
      default:
        return {
          iconBg: 'bg-[#c4e7ff]/20 text-[#c4e7ff]',
          badgeBg: 'bg-[#272a31] text-[#c4e7ff]',
          accentText: 'text-[#c4e7ff]',
          barColor: 'bg-[#c4e7ff]',
          starColor: 'text-[#c4e7ff]',
        };
    }
  };

  // Determine grid column sizing dynamically:
  // Col 1 (Labels): 3.5 cols, each tool: 2 cols, Add tool: 1.5 cols
  const toolColsCount = activeTools.length;
  // We can use an inline CSS or responsive grid template
  const gridTemplate = `minmax(240px, 1.4fr) repeat(${toolColsCount}, minmax(190px, 1fr)) minmax(90px, 0.6fr)`;

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-2xl bg-[#0b0e14] border border-white/10 pb-4">
      <div className="min-w-[960px] flex flex-col">
        {/* Sticky Header Row */}
        <div
          className="grid gap-2 p-4 bg-[#191c22]/95 border-b border-white/10 rounded-t-xl items-stretch sticky top-20 z-20 backdrop-blur-xl"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {/* Axis Title */}
          <div className="flex flex-col justify-end p-2 pr-4">
            <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#908fa0]">
              Comparison Axis
            </span>
            <span className="font-headline text-[18px] font-semibold text-[#e0e2eb] mt-1 tracking-tight">
              Foundational Profiles
            </span>
          </div>

          {/* Active Model Columns */}
          {activeTools.map((tool) => {
            const styles = getThemeStyles(tool.colorTheme);
            return (
              <div
                key={tool.id}
                className="p-3 rounded-lg bg-[#1d2026] border border-white/5 flex flex-col justify-between relative group hover:bg-[#272a31] hover:border-white/10 transition-all shadow-sm"
              >
                {/* Remove button */}
                {activeTools.length > 1 && (
                  <button
                    onClick={() => onRemoveTool(tool.id)}
                    className="absolute top-2 right-2 text-[#908fa0] hover:text-[#ffb4ab] transition-colors p-1 rounded hover:bg-white/5"
                    title={`Remove ${tool.name}`}
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}

                <div className="flex items-center gap-2.5 mb-2 pr-5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${styles.iconBg}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {tool.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline text-[15px] font-semibold text-[#e0e2eb] truncate">
                      {tool.name}
                    </span>
                    <span className={`font-mono-code text-[11px] truncate ${styles.accentText}`}>
                      {tool.provider}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-1 pt-2 border-t border-white/5">
                  <span className="font-mono-code text-[13px] text-[#e0e2eb] font-semibold">
                    {tool.priceMonthly}
                    <span className="text-[#908fa0] font-normal text-[11px]">/mo</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono-code text-[11px] font-medium ${styles.badgeBg}`}
                  >
                    {tool.tag}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Add Tool Button */}
          <div
            onClick={onOpenAddTool}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenAddTool()}
            className="p-3 rounded-lg bg-[#191c22] hover:bg-[#1d2026] border border-dashed border-white/15 hover:border-[#7bd0ff]/40 flex flex-col items-center justify-center cursor-pointer transition-all text-[#908fa0] hover:text-[#7bd0ff] group shadow-inner"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform text-[#7bd0ff]">
              add_circle
            </span>
            <span className="font-mono-code text-[11px] mt-1 text-center font-medium">
              Add Tool
            </span>
          </div>
        </div>

        {/* Matrix Rows */}
        <div className="flex flex-col">
          {/* Row 1: Primary Use Case */}
          <div
            className={`grid gap-2 p-4 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/50 ${
              highlightDifferences ? 'bg-[#272a31]/25' : ''
            }`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">category</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Primary Use Case
              </span>
            </div>
            {activeTools.map((tool) => (
              <div key={tool.id} className="px-1 text-[13px] md:text-[14px] text-[#e0e2eb] font-medium leading-snug">
                {tool.primaryUseCase}
              </div>
            ))}
            <div />
          </div>

          {/* Row 2: Rating & Reviews */}
          <div
            className={`grid gap-2 p-4 bg-[#191c22]/30 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/70`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">star</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Rating & Reviews
              </span>
            </div>
            {activeTools.map((tool) => {
              const styles = getThemeStyles(tool.colorTheme);
              return (
                <div key={tool.id} className="px-1 flex items-center gap-2">
                  <div className={`flex items-center ${styles.starColor}`}>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-mono-code text-[13px] font-bold ml-1">
                      {tool.rating.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#908fa0]">
                    ({tool.reviewsCount.toLocaleString()})
                  </span>
                </div>
              );
            })}
            <div />
          </div>

          {/* Row 3: Pricing Model & Entry */}
          <div
            className={`grid gap-2 p-4 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/50 ${
              highlightDifferences ? 'bg-[#272a31]/25' : ''
            }`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">loyalty</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Pricing Model & Entry
              </span>
            </div>
            {activeTools.map((tool) => (
              <div key={tool.id} className="px-1 text-[13px] text-[#e0e2eb] leading-relaxed">
                {tool.pricingModelEntry}
              </div>
            ))}
            <div />
          </div>

          {/* Row 4: Free Tier Limits */}
          <div
            className={`grid gap-2 p-4 bg-[#191c22]/30 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/70`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">
                hourglass_empty
              </span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Free Tier Limits
              </span>
            </div>
            {activeTools.map((tool) => (
              <div key={tool.id} className="px-1 text-[13px] text-[#c7c4d7] leading-relaxed">
                {tool.freeTierLimits}
              </div>
            ))}
            <div />
          </div>

          {/* Row 5: Context Window */}
          <div
            className={`grid gap-2 p-4 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/50 ${
              highlightDifferences ? 'bg-[#272a31]/25' : ''
            }`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">memory</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Context Window
              </span>
            </div>
            {activeTools.map((tool) => (
              <div key={tool.id} className="px-1 flex flex-col">
                <span
                  className={`font-mono-code text-[13px] font-semibold ${
                    tool.contextHighlight ? 'text-[#c4e7ff]' : 'text-[#e0e2eb]'
                  }`}
                >
                  {tool.contextTokens}
                </span>
                <span
                  className={`text-[12px] ${
                    tool.contextHighlight ? 'text-[#7bd0ff] font-medium' : 'text-[#908fa0]'
                  }`}
                >
                  {tool.contextWords}
                </span>
              </div>
            ))}
            <div />
          </div>

          {/* Row 6: Code Quality & SWE-Bench */}
          <div
            className={`grid gap-2 p-4 bg-[#191c22]/30 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/70`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">
                integration_instructions
              </span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Code Quality & SWE-Bench
              </span>
            </div>
            {activeTools.map((tool) => {
              const styles = getThemeStyles(tool.colorTheme);
              return (
                <div key={tool.id} className="px-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[#1d2026] h-2 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`${styles.barColor} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(100, Math.max(10, tool.sweBenchScore))}%` }}
                      />
                    </div>
                    <span className={`font-mono-code text-[11px] font-bold ${styles.accentText}`}>
                      {tool.sweBenchScore.toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-[12px] text-[#908fa0] mt-1 block leading-snug">
                    {tool.sweBenchNote}
                  </span>
                </div>
              );
            })}
            <div />
          </div>

          {/* Row 7: Multimodal Capabilities */}
          <div
            className={`grid gap-2 p-4 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/50 ${
              highlightDifferences ? 'bg-[#272a31]/25' : ''
            }`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">visibility</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Multimodal Capabilities
              </span>
            </div>
            {activeTools.map((tool) => {
              const styles = getThemeStyles(tool.colorTheme);
              return (
                <div key={tool.id} className="px-1 flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#e0e2eb] leading-snug">{tool.multimodal}</span>
                  <span
                    className={`font-mono-code text-[11px] ${
                      tool.multimodalHighlight ? styles.accentText : 'text-[#908fa0]'
                    }`}
                  >
                    {tool.multimodalSub}
                  </span>
                </div>
              );
            })}
            <div />
          </div>

          {/* Row 8: API & Developer Rates */}
          <div
            className={`grid gap-2 p-4 bg-[#191c22]/30 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/70`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">api</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                API & Developer Rates
              </span>
            </div>
            {activeTools.map((tool) => (
              <div key={tool.id} className="px-1 font-mono-code text-[12px] text-[#e0e2eb]">
                {tool.apiRates}{' '}
                <span className="text-[#908fa0] font-normal">{tool.apiRatesSub}</span>
              </div>
            ))}
            <div />
          </div>

          {/* Row 9: Enterprise Privacy & SOC2 */}
          <div
            className={`grid gap-2 p-4 border-b border-white/5 items-center transition-colors hover:bg-[#191c22]/50 ${
              highlightDifferences ? 'bg-[#272a31]/25' : ''
            }`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">security</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Enterprise Privacy & SOC2
              </span>
            </div>
            {activeTools.map((tool) => {
              const styles = getThemeStyles(tool.colorTheme);
              return (
                <div key={tool.id} className="px-1">
                  <span
                    className={`inline-flex items-center gap-1 font-mono-code text-[11px] leading-tight ${styles.accentText}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>{tool.privacy}</span>
                  </span>
                </div>
              );
            })}
            <div />
          </div>

          {/* Row 10: Supported Platforms */}
          <div
            className={`grid gap-2 p-4 bg-[#191c22]/30 rounded-b-xl items-center transition-colors hover:bg-[#191c22]/70`}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#908fa0] text-lg">devices</span>
              <span className="font-headline text-[15px] font-semibold text-[#e0e2eb]">
                Supported Platforms
              </span>
            </div>
            {activeTools.map((tool) => (
              <div key={tool.id} className="px-1 text-[13px] text-[#c7c4d7] leading-relaxed">
                {tool.platforms}
              </div>
            ))}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};
