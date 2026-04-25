'use client'
import { useState } from 'react'
import {
  BellRing,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FolderOpen,
  LineChart,
  Loader,
  RefreshCcw,
  RotateCcw,
  Save,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  SquareGantt,
  Zap,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

const BLOCK_GROUPS = [
  'Analysis Logic',
  'Trade parameters',
  'Purchase conditions',
  'Sell conditions (optional)',
  'Restart trading conditions',
  'Analysis',
  'Utility',
  'Virtual Hook Switcher',
  'Custom Notification',
  'Binarytools',
  'Contract modifiers',
  'Barrier Settings',
]

const TOOLBAR_ITEMS = [
  { icon: RefreshCcw, active: false },
  { icon: FolderOpen, active: false },
  { icon: Save, active: false },
  { icon: SquareGantt, active: false },
  { icon: LineChart, active: false },
  { icon: SlidersHorizontal, active: false },
  { icon: BellRing, active: true },
  { icon: RotateCcw, active: false },
  { icon: Loader, active: false },
  { icon: ZoomIn, active: false },
  { icon: ZoomOut, active: false },
]

const SUMMARY_TABS = ['Summary', 'Transactions', 'Journal']

function ToolbarButton({
  icon: Icon,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
}) {
  return (
    <button
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
        active
          ? 'border-red-200 bg-red-50 text-red-500'
          : 'border-transparent bg-white text-[#626c7f] hover:border-[#d9deea]'
      }`}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

function ChoiceChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-[#cfd5e3] bg-white px-3 py-1.5 text-xs font-medium text-[#1a1d33] shadow-sm"
    >
      <span>{label}</span>
      <ChevronDown className="h-3.5 w-3.5 text-[#5f6880]" />
    </button>
  )
}

function TinyCheckbox({ checked = false }: { checked?: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded border text-[10px] font-bold ${
        checked
          ? 'border-[#c8cedf] bg-white text-[#5d6580]'
          : 'border-[#d7dcea] bg-white text-transparent'
      }`}
    >
      x
    </span>
  )
}

function BlockShell({
  number,
  title,
  className = '',
  children,
}: {
  number: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`rounded-[4px] bg-[#1719a7] text-white shadow-[0_10px_24px_rgba(17,24,39,0.08)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-sm font-medium">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[2px] border border-white/30 text-[10px]">
          {number}
        </span>
        <span>{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </section>
  )
}

function InnerPanel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-[4px] border border-[#d8dce7] bg-[#ececec] p-3 text-[#20233b] ${className}`}>
      {children}
    </div>
  )
}

export default function BotBuilderWorkspace() {
  const [activeTab, setActiveTab] = useState('Summary')

  return (
    <div className="-mx-4 min-h-[calc(100vh-96px)] bg-[#f5f6fb] text-[#1d2240] sm:-mx-6 lg:-mx-8">
      <div className="grid min-h-[calc(100vh-96px)] grid-cols-1 xl:grid-cols-[238px_minmax(0,1fr)_360px]">
        <aside className="border-b border-[#dfe3ee] bg-[#f3f4f8] px-4 py-4 xl:border-b-0 xl:border-r">
          <button
            type="button"
            className="mb-4 flex w-full items-center justify-center rounded-[4px] bg-[#1719a7] px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            Quick strategy
          </button>

          <div className="rounded-[4px] border border-[#d7dcea] bg-white">
            <div className="flex items-center justify-between border-b border-[#e5e9f2] px-4 py-4">
              <span className="text-[15px] font-semibold text-[#30364f]">Blocks menu</span>
              <ChevronUp className="h-4 w-4 text-[#616983]" />
            </div>

            <div className="px-3 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b92a8]" />
                <input
                  type="text"
                  placeholder="Search"
                  className="h-10 w-full rounded-xl border border-[#d7dcea] bg-[#fbfcff] pl-10 pr-3 text-sm text-[#20233b] outline-none placeholder:text-[#9aa1b6]"
                />
              </div>
            </div>

            <div className="max-h-[65vh] overflow-auto px-3 pb-4">
              {BLOCK_GROUPS.map((group, index) => (
                <button
                  key={group}
                  type="button"
                  className="flex w-full items-center justify-between border-t border-[#edf0f6] px-1 py-4 text-left text-[14px] font-semibold text-[#2e334d] first:border-t-0"
                >
                  <span className="flex items-center gap-2">
                    {index === 0 ? <span className="text-xs text-[#ff7a3c]">Hot</span> : null}
                    <span>{group}</span>
                  </span>
                  {group === 'Analysis' || group === 'Utility' ? (
                    <ChevronDown className="h-4 w-4 text-[#646b82]" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#ffbf1e] px-3 py-2 text-xs font-semibold text-[#2b2411] shadow-sm"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Risk Disclaimer
          </button>
        </aside>

        <section className="min-w-0 bg-white">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-[#dfe3ee] px-4 py-3">
            <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent text-[#5f6880]">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {TOOLBAR_ITEMS.map((item, index) => (
              <ToolbarButton key={index} icon={item.icon} active={item.active} />
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="grid min-w-[980px] grid-cols-[1.1fr_0.85fr] gap-8 px-4 py-6">
              <div className="space-y-8">
                <BlockShell number="1." title="Trade parameters">
                  <InnerPanel className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span>Market:</span>
                      <ChoiceChip label="Deriv" />
                      <ChoiceChip label="Continuous Indices" />
                      <ChoiceChip label="Volatility 10 (1s) Index" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span>Alternate markets (Continuous Indices only):</span>
                      <TinyCheckbox />
                      <span>every</span>
                      <span className="inline-flex h-7 items-center rounded-md border border-[#cfd5e3] bg-white px-3 text-xs">1</span>
                      <span>run(s)</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span>Scan all volatility markets simultaneously:</span>
                      <TinyCheckbox />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span>Virtual Hook:</span>
                      <TinyCheckbox />
                      <button
                        type="button"
                        className="rounded-full border border-[#ffd3dc] bg-white px-3 py-1 text-[11px] font-semibold text-[#ff5d84]"
                      >
                        Virtual Hook Settings
                      </button>
                    </div>
                  </InnerPanel>

                  <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs">
                    <span>Trade Type:</span>
                    <ChoiceChip label="Up/Down" />
                    <ChoiceChip label="Rise/Fall" />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs">
                    <span>Contract Type:</span>
                    <ChoiceChip label="Both" />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs">
                    <span>Default Candle Interval:</span>
                    <ChoiceChip label="1 minute" />
                  </div>

                  <InnerPanel className="mt-3 flex items-center justify-between text-xs">
                    <span>Restart buy/sell on error (disable for better performance):</span>
                    <TinyCheckbox />
                  </InnerPanel>

                  <InnerPanel className="mt-3 flex items-center justify-between text-xs">
                    <span>Restart last trade on error (bot ignores the unsuccessful trade):</span>
                    <TinyCheckbox checked />
                  </InnerPanel>

                  <div className="mt-3 px-1 text-sm">Run once at start:</div>
                  <div className="mt-2 h-10 rounded-[4px] bg-white/95" />

                  <div className="mt-4 px-1 text-sm">Trade options:</div>
                  <InnerPanel className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span>Duration:</span>
                    <ChoiceChip label="Ticks" />
                    <span className="inline-flex h-7 items-center rounded-full border border-[#cfd5e3] bg-white px-4 text-xs">1</span>
                    <span>Stake:</span>
                    <span>AUD</span>
                    <span className="inline-flex h-7 items-center rounded-full border border-[#cfd5e3] bg-white px-4 text-xs">0.5</span>
                    <span>(min: 0.5 - max: 69000) Trade each tick:</span>
                    <TinyCheckbox />
                  </InnerPanel>
                </BlockShell>

                <BlockShell number="2." title="Purchase conditions" className="max-w-[276px]">
                  <InnerPanel className="space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span>Purchase</span>
                      <ChoiceChip label="Rise" />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Allow Bulk Purchase:</span>
                      <ChoiceChip label="No" />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>No. of Trades:</span>
                      <span className="inline-flex h-7 items-center rounded-md border border-[#cfd5e3] bg-white px-3 text-xs">1</span>
                    </div>
                  </InnerPanel>
                </BlockShell>
              </div>

              <div className="space-y-8 pt-2">
                <BlockShell number="3." title="Sell conditions" className="max-w-[278px]">
                  <InnerPanel className="flex items-center gap-3 text-xs">
                    <span>if</span>
                    <span className="rounded-full border border-[#cfd5e3] bg-white px-4 py-2 text-xs shadow-sm">
                      Sell is available
                    </span>
                    <span>then</span>
                  </InnerPanel>
                  <div className="mt-3 h-10 rounded-[4px] bg-white/95" />
                </BlockShell>

                <BlockShell number="4." title="Restart trading conditions" className="max-w-[278px]">
                  <InnerPanel className="inline-flex items-center text-xs">
                    <span className="rounded-[4px] bg-white px-4 py-2 shadow-sm">Trade again</span>
                  </InnerPanel>
                </BlockShell>
              </div>
            </div>
          </div>
        </section>

        <aside className="border-l border-[#dfe3ee] bg-[#f7f8fb]">
          <div className="border-b border-[#dfe3ee] px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 min-w-[82px] items-center justify-center gap-2 rounded-[4px] bg-[#5acfd1] px-4 text-sm font-semibold text-white"
              >
                <Zap className="h-4 w-4 fill-current" />
                Run
              </button>
              <button
                type="button"
                className="flex h-10 flex-1 items-center justify-between rounded-[4px] border border-[#d6dbe7] bg-white px-4 text-sm text-[#363b54]"
              >
                <span>Bot is not running</span>
                <ChevronDown className="h-4 w-4 text-[#5f6880]" />
              </button>
            </div>
          </div>

          <div className="border-b border-[#dfe3ee] bg-white px-4">
            <div className="flex items-center gap-8">
              {SUMMARY_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 px-1 py-4 text-sm ${
                    activeTab === tab
                      ? 'border-[#1719a7] font-semibold text-[#20233b]'
                      : 'border-transparent text-[#6a7187]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-[calc(100vh-210px)] flex-col bg-[#f7f8fb]">
            <div className="mx-4 mt-4 flex-1 rounded-[4px] border border-[#eceef5] bg-white">
              <div className="flex h-full items-center justify-center px-8 text-center">
                <div className="max-w-[220px]">
                  <p className="text-[15px] leading-7 text-[#353a54]">
                    When you&apos;re ready to trade, hit <span className="font-semibold">Run</span>.
                    You&apos;ll be able to track your bot&apos;s performance here.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-[#dfe3ee] bg-[#f7f8fb] px-4 py-4">
              <div className="mb-2 flex items-center justify-end text-[11px] text-[#666f86]">
                <button type="button" className="underline underline-offset-2">
                  What&apos;s this?
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="font-semibold text-[#2d3350]">Total stake</div>
                  <div className="mt-2 text-[#6d7488]">0.00 AUD</div>
                </div>
                <div>
                  <div className="font-semibold text-[#2d3350]">Total payout</div>
                  <div className="mt-2 text-[#6d7488]">0.00 AUD</div>
                </div>
                <div>
                  <div className="font-semibold text-[#2d3350]">No. of runs</div>
                  <div className="mt-2 text-[#6d7488]">0</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
