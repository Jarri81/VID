import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Aperture,
  ArrowUpRight,
  AudioLines,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clapperboard,
  Clock3,
  Command,
  Film,
  FolderOpen,
  Gauge,
  Image as ImageIcon,
  Layers3,
  Lightbulb,
  LoaderCircle,
  MessageSquareText,
  MoreHorizontal,
  PanelRight,
  PencilLine,
  Play,
  Plus,
  RefreshCcw,
  Search,
  Send,
  Settings2,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type ShotStatus = 'ready' | 'rendering' | 'complete' | 'needs review';
type Provider = 'Veo 3' | 'Runway Gen-4' | 'Luma Ray 2' | 'ElevenLabs';
type Shot = {
  id: string;
  code: string;
  title: string;
  description: string;
  duration: string;
  provider: Provider;
  status: ShotStatus;
  kind: 'video' | 'audio' | 'still';
  tintA: string;
  tintB: string;
};
type Scene = {
  id: string;
  number: string;
  title: string;
  setting: string;
  progress: number;
  shots: Shot[];
};

const queryClient = new QueryClient();

const initialScenes: Scene[] = [
  {
    id: 'arrival',
    number: '01',
    title: 'The Arrival',
    setting: 'EXT. SALT FLATS · DUSK',
    progress: 82,
    shots: [
      { id: 's01-01', code: '01A', title: 'A long way home', description: 'A lone figure crosses the salt flats, swallowed by the last orange light.', duration: '00:07', provider: 'Veo 3', status: 'complete', kind: 'video', tintA: '#b5664d', tintB: '#182e2d' },
      { id: 's01-02', code: '01B', title: 'The object in frame', description: 'Low push toward the black case half-buried in mineral crust.', duration: '00:05', provider: 'Runway Gen-4', status: 'complete', kind: 'video', tintA: '#284a4a', tintB: '#c88863' },
      { id: 's01-03', code: '01C', title: 'Wind before speech', description: 'A detail of Mara’s hand tightening around the radio wire.', duration: '00:04', provider: 'Luma Ray 2', status: 'needs review', kind: 'video', tintA: '#425454', tintB: '#161f22' },
      { id: 's01-04', code: '01D', title: 'Radio texture', description: 'The first fragment of the voice from the other side.', duration: '00:06', provider: 'ElevenLabs', status: 'ready', kind: 'audio', tintA: '#8d614d', tintB: '#202a2a' },
    ],
  },
  {
    id: 'signal',
    number: '02',
    title: 'The Signal',
    setting: 'INT. WEATHER STATION · NIGHT',
    progress: 46,
    shots: [
      { id: 's02-01', code: '02A', title: 'Fluorescent hum', description: 'A dead monitor pulses across the station walls as Mara enters.', duration: '00:06', provider: 'Veo 3', status: 'complete', kind: 'video', tintA: '#30504d', tintB: '#9d6b59' },
      { id: 's02-02', code: '02B', title: 'Not a reflection', description: 'Mara sees movement behind her in the convex security mirror.', duration: '00:08', provider: 'Runway Gen-4', status: 'rendering', kind: 'video', tintA: '#252d35', tintB: '#b17b65' },
      { id: 's02-03', code: '02C', title: 'The coordinates', description: 'A chalk mark resolves into a latitude, then disappears.', duration: '00:05', provider: 'Luma Ray 2', status: 'ready', kind: 'still', tintA: '#b49a72', tintB: '#202f31' },
    ],
  },
  {
    id: 'underpass',
    number: '03',
    title: 'Underpass',
    setting: 'EXT. SERVICE ROAD · PRE-DAWN',
    progress: 18,
    shots: [
      { id: 's03-01', code: '03A', title: 'Blue hour', description: 'The station van cuts through fog beneath the elevated rails.', duration: '00:09', provider: 'Veo 3', status: 'ready', kind: 'video', tintA: '#334d58', tintB: '#a56d5a' },
      { id: 's03-02', code: '03B', title: 'A choice', description: 'Mara stops beneath the sodium light and looks toward the water.', duration: '00:07', provider: 'Runway Gen-4', status: 'ready', kind: 'video', tintA: '#9a6a56', tintB: '#1d3338' },
    ],
  },
  {
    id: 'shoreline',
    number: '04',
    title: 'Low Tide',
    setting: 'EXT. NORTH SHORE · MORNING',
    progress: 0,
    shots: [],
  },
];

const navItems = [
  { label: 'Film overview', icon: Gauge, tab: 'overview' },
  { label: 'Edit timeline', icon: Clapperboard, tab: 'timeline' },
  { label: 'Continuity bible', icon: Layers3, tab: 'continuity' },
];

const providerColors: Record<Provider, string> = {
  'Veo 3': '#dca089',
  'Runway Gen-4': '#d1b06f',
  'Luma Ray 2': '#7bb5aa',
  ElevenLabs: '#b18ba8',
};

function statusLabel(status: ShotStatus) {
  if (status === 'complete') return 'locked';
  if (status === 'needs review') return 'review';
  if (status === 'rendering') return 'rendering';
  return 'ready';
}

function statusClass(status: ShotStatus) {
  if (status === 'complete') return 'done';
  if (status === 'rendering') return 'working';
  if (status === 'needs review') return 'blocked';
  return 'ready';
}

function Home() {
  const [, setLocation] = useLocation();
  const [scenes, setScenes] = useState<Scene[]>(initialScenes);
  const [activeSceneId, setActiveSceneId] = useState('signal');
  const [selectedShotId, setSelectedShotId] = useState('s02-02');
  const [activeTab, setActiveTab] = useState('overview');
  const [providerFilter, setProviderFilter] = useState<Provider | 'All'>('All');
  const [showNewScene, setShowNewScene] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [newSceneTitle, setNewSceneTitle] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 'assistant-1', role: 'assistant', text: 'Good morning, Mira. Scene 02 is the hinge of the film. The mirror shot is rendering; I held the 35mm grain and sodium-to-teal shift from The Arrival.' },
    { id: 'assistant-2', role: 'assistant', text: 'What should we solve next?', chips: ['Tighten the mirror shot', 'Build Scene 03', 'Check sound continuity'] },
  ]);

  const activeScene = useMemo(() => scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0], [activeSceneId, scenes]);
  const selectedShot = useMemo(() => activeScene.shots.find((shot) => shot.id === selectedShotId) ?? activeScene.shots[0], [activeScene, selectedShotId]);
  const totalShots = scenes.reduce((total, scene) => total + scene.shots.length, 0);
  const completedShots = scenes.reduce((total, scene) => total + scene.shots.filter((shot) => shot.status === 'complete').length, 0);
  const activeProviders = [...new Set(scenes.flatMap((scene) => scene.shots.map((shot) => shot.provider)))];
  const visibleShots = providerFilter === 'All' ? activeScene.shots : activeScene.shots.filter((shot) => shot.provider === providerFilter);

  function updateShot(shotId: string, updates: Partial<Shot>) {
    setScenes((current) => current.map((scene) => ({
      ...scene,
      shots: scene.shots.map((shot) => shot.id === shotId ? { ...shot, ...updates } : shot),
    })));
  }

  function selectScene(sceneId: string) {
    const scene = scenes.find((item) => item.id === sceneId);
    setActiveSceneId(sceneId);
    setSelectedShotId(scene?.shots[0]?.id ?? '');
    setProviderFilter('All');
  }

  function renderSelectedShot() {
    if (!selectedShot || selectedShot.status === 'rendering') return;
    updateShot(selectedShot.id, { status: 'rendering' });
    setTimeout(() => updateShot(selectedShot.id, { status: 'complete' }), 2200);
  }

  function cycleShotStatus(shot: Shot) {
    if (shot.status === 'rendering') return;
    if (shot.status === 'complete') updateShot(shot.id, { status: 'needs review' });
    else if (shot.status === 'needs review') updateShot(shot.id, { status: 'ready' });
    else renderShotById(shot.id);
  }

  function renderShotById(shotId: string) {
    updateShot(shotId, { status: 'rendering' });
    setTimeout(() => updateShot(shotId, { status: 'complete' }), 2200);
  }

  function sendMessage(text = chatInput) {
    const cleanText = text.trim();
    if (!cleanText) return;
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: 'user', text: cleanText }]);
    setChatInput('');
    setTimeout(() => setMessages((current) => [...current, {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: cleanText.toLowerCase().includes('sound')
        ? 'I found one continuity note: the radio bed is two semitones warmer in 01D. I can carry that texture into the station ambience without changing the dialogue print.'
        : 'I’ll translate that into the next pass. The character logic and visual language will stay pinned while I shape the shot work.',
    }]), 700);
  }

  function addScene(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newSceneTitle.trim() || 'Untitled scene';
    const id = `scene-${Date.now()}`;
    const scene: Scene = { id, number: String(scenes.length + 1).padStart(2, '0'), title, setting: 'SETTING TO BE PLACED', progress: 0, shots: [] };
    setScenes((current) => [...current, scene]);
    setNewSceneTitle('');
    setShowNewScene(false);
    selectScene(id);
  }

  return (
    <div className="studio-app">
      <div className="studio-layout">
        <aside className="studio-sidebar">
          <div className="studio-sidebar-inner flex min-h-screen flex-col p-5">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2.5 text-left" onClick={() => setLocation('/')} data-testid="button-home">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Aperture size={17} strokeWidth={2.4} /></span>
                <span><span className="block text-sm font-semibold tracking-tight text-foreground">Director</span><span className="block font-mono-ui text-[9px] uppercase tracking-[.22em] text-muted-foreground">studio / 01</span></span>
              </button>
              <button className="hidden rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground md:block" onClick={() => setShowCommand((open) => !open)} data-testid="button-sidebar-command"><Command size={16} /></button>
            </div>

            <div className="sidebar-nav mt-12">
              <p className="section-kicker mb-3 px-2">Workspace</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.tab;
                  return <button key={item.tab} className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left text-[12px] transition-colors ${isActive ? 'bg-sidebar-accent text-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground'}`} onClick={() => setActiveTab(item.tab)} data-testid={`button-tab-${item.tab}`}><Icon size={15} strokeWidth={1.7} /><span>{item.label}</span>{isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}</button>;
                })}
              </nav>
            </div>

            <div className="sidebar-projects mt-10">
              <div className="mb-3 flex items-center justify-between px-2">
                <p className="section-kicker">Films</p>
                <button className="text-muted-foreground transition-colors hover:text-primary" onClick={() => setShowNewScene(true)} data-testid="button-add-film"><Plus size={14} /></button>
              </div>
              <button className="flex w-full items-center gap-3 rounded-md bg-sidebar-accent/75 px-2.5 py-3 text-left" onClick={() => setActiveTab('overview')} data-testid="button-film-project">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-secondary text-accent"><Film size={14} /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-[12px] font-medium text-foreground">The Last Light</span><span className="block font-mono-ui text-[9px] text-muted-foreground">feature / in progress</span></span>
                <ChevronRight size={13} className="text-muted-foreground" />
              </button>
            </div>

            <div className="sidebar-footer mt-auto pt-8">
              <div className="mb-5 rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3.5">
                <div className="mb-2 flex items-center justify-between"><span className="section-kicker">Film progress</span><span className="font-mono-ui text-[10px] text-accent">38.4%</span></div>
                <div className="timeline-track"><div className="timeline-fill" style={{ width: '38.4%' }} /></div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>{completedShots} of {totalShots} shots locked</span><span>act I</span></div>
              </div>
              <div className="flex items-center justify-between border-t border-sidebar-border pt-4">
                <button className="flex items-center gap-2 text-left" onClick={() => setShowCommand(true)} data-testid="button-profile">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono-ui text-[10px] text-primary">MC</span>
                  <span><span className="block text-[11px] text-foreground">Mira Chen</span><span className="block text-[9px] text-muted-foreground">director</span></span>
                </button>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => setShowCommand(true)} data-testid="button-settings"><Settings2 size={15} /></button>
              </div>
            </div>
          </div>
        </aside>

        <main className="studio-main">
          <header className="studio-topbar">
            <div className="flex min-w-0 items-center gap-3">
              <span className="hidden font-mono-ui text-[10px] tracking-[.14em] text-muted-foreground sm:inline">THE LAST LIGHT</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary" onClick={() => setShowCommand((open) => !open)} data-testid="button-project-menu">Project command <ChevronDown size={14} className="text-muted-foreground" /></button>
            </div>
            <div className="studio-topbar-actions flex items-center gap-2">
              <button className="button-quiet flex items-center gap-2 px-2.5 py-2 text-[11px]" onClick={() => setShowCommand(true)} data-testid="button-search"><Search size={14} /><span className="hidden sm:inline">Search film</span><span className="hidden font-mono-ui text-[9px] text-muted-foreground md:inline">⌘K</span></button>
              <button className="button-quiet relative p-2" onClick={() => setShowCommand(true)} data-testid="button-notifications"><Bell size={15} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" /></button>
              <button className="button-quiet hidden items-center gap-2 px-2.5 py-2 text-[11px] sm:flex" onClick={() => setShowCommand(true)} data-testid="button-share"><Share2 size={13} /> Share review</button>
            </div>
          </header>

          <div className="studio-content">
            <section className="content-column">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="section-kicker mb-2">Monday, 14 October · 08:42</p>
                  <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl">Good morning, Mira<span className="text-primary">.</span></h1>
                  <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted-foreground">The film is holding its shape. Three decisions are waiting for your eye.</p>
                </div>
                <button className="button-primary hidden items-center gap-2 px-3.5 py-2.5 text-[11px] font-semibold sm:flex" onClick={() => setShowNewScene(true)} data-testid="button-new-scene"><Plus size={14} /> New scene</button>
              </div>

              <div className="mb-7 flex items-center gap-6 border-b border-border/70">
                <button className={`relative pb-3 text-[11px] font-medium ${activeTab === 'overview' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('overview')} data-testid="button-view-overview">Scene board {activeTab === 'overview' && <span className="absolute bottom-[-1px] left-0 right-0 h-px bg-primary" />}</button>
                <button className={`relative pb-3 text-[11px] font-medium ${activeTab === 'timeline' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('timeline')} data-testid="button-view-timeline">Timeline {activeTab === 'timeline' && <span className="absolute bottom-[-1px] left-0 right-0 h-px bg-primary" />}</button>
                <button className={`relative pb-3 text-[11px] font-medium ${activeTab === 'continuity' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('continuity')} data-testid="button-view-continuity">Continuity {activeTab === 'continuity' && <span className="absolute bottom-[-1px] left-0 right-0 h-px bg-primary" />}</button>
                <span className="ml-auto hidden items-center gap-1.5 pb-3 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-green-400/80" /> all systems nominal</span>
              </div>

              <div className="mb-5">
                <div className="mb-3 flex items-center justify-between">
                  <div><span className="section-kicker">Scene rail</span><span className="ml-3 text-[11px] text-muted-foreground">{scenes.length} scenes · 18 min planned</span></div>
                  <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground" onClick={() => setShowCommand(true)} data-testid="button-rail-options"><MoreHorizontal size={15} /> options</button>
                </div>
                <div className="scene-rail">
                  {scenes.map((scene) => <button key={scene.id} className={`scene-card ${activeScene.id === scene.id ? 'is-active' : ''}`} onClick={() => selectScene(scene.id)} data-testid={`button-scene-${scene.id}`}>
                    <div className="flex items-center justify-between"><span className="scene-number">SC {scene.number}</span>{scene.progress === 100 ? <CheckCircle2 size={13} className="text-green-300/80" /> : scene.shots.length === 0 ? <Plus size={13} className="text-muted-foreground" /> : <span className="font-mono-ui text-[9px] text-muted-foreground">{scene.progress}%</span>}</div>
                    <div className="scene-card-title">{scene.title}</div><div className="scene-card-meta">{scene.shots.length} shots · {scene.setting.split(' · ')[0]}</div>
                    <div className="mt-3 timeline-track"><div className="timeline-fill" style={{ width: `${scene.progress}%` }} /></div>
                  </button>)}
                  <button className="scene-card flex flex-col items-center justify-center gap-2 border-dashed text-muted-foreground hover:text-foreground" onClick={() => setShowNewScene(true)} data-testid="button-new-scene-rail"><Plus size={16} /><span className="text-[10px]">Add scene</span></button>
                </div>
              </div>

              {activeTab === 'overview' && <div className="panel overflow-hidden">
                <div className="border-b border-border/70 px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><div className="mb-1 flex items-center gap-2"><span className="font-mono-ui text-[10px] text-primary">SC {activeScene.number}</span><span className="text-muted-foreground">/</span><span className="text-[10px] uppercase tracking-[.13em] text-muted-foreground">{activeScene.setting}</span></div><h2 className="font-display text-3xl text-foreground">{activeScene.title}</h2></div>
                    <button className="button-quiet flex items-center gap-2 px-2.5 py-2 text-[10px]" onClick={() => setShowCommand(true)} data-testid="button-edit-scene"><PencilLine size={13} /> Edit scene</button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button className={`rounded-md px-2.5 py-1.5 font-mono-ui text-[9px] ${providerFilter === 'All' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60'}`} onClick={() => setProviderFilter('All')} data-testid="button-provider-all">all engines</button>
                    {activeProviders.map((provider) => <button key={provider} className={`rounded-md px-2.5 py-1.5 font-mono-ui text-[9px] ${providerFilter === provider ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60'}`} onClick={() => setProviderFilter(provider)} data-testid={`button-provider-${provider.replaceAll(' ', '-').toLowerCase()}`}>{provider}</button>)}
                    <span className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground"><SlidersHorizontal size={12} /> {visibleShots.length} shown</span>
                  </div>
                </div>
                {activeScene.shots.length === 0 ? <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center"><span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent"><Clapperboard size={17} /></span><h3 className="text-sm font-medium text-foreground">A blank page, on purpose.</h3><p className="mt-1 max-w-xs text-[11px] leading-relaxed text-muted-foreground">Give this scene a pulse. The co-director can turn a sentence into a shot list.</p><button className="button-primary mt-4 px-3 py-2 text-[10px]" onClick={() => sendMessage(`Build a first shot list for ${activeScene.title}`)} data-testid="button-build-shot-list">Ask co-director to build it</button></div> : visibleShots.map((shot) => <button key={shot.id} className={`shot-row w-full text-left ${selectedShot?.id === shot.id ? 'is-selected' : ''}`} onClick={() => setSelectedShotId(shot.id)} data-testid={`button-shot-${shot.id}`}>
                  <div className="shot-thumb hidden sm:block" style={{ '--thumb-a': shot.tintA, '--thumb-b': shot.tintB } as Record<string, string>}><span className="absolute inset-x-1 bottom-1 z-10 text-right font-mono-ui text-[8px] text-foreground/70">{shot.duration}</span></div>
                  <div className="shot-info"><div className="flex items-center gap-2"><span className="shot-index">{shot.code}</span><span className="shot-title">{shot.title}</span></div><div className="shot-subtitle">{shot.description}</div><div className="mt-2 flex items-center gap-2"><span className="font-mono-ui text-[9px]" style={{ color: providerColors[shot.provider] }}>{shot.provider}</span><span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" /><span className="text-[10px] text-muted-foreground">{shot.kind}</span></div></div>
                  <span className="shot-status"><span className={`status-dot ${statusClass(shot.status)}`} />{statusLabel(shot.status)}</span>
                </button>)}
                {providerFilter !== 'All' && visibleShots.length === 0 && <div className="px-5 py-12 text-center text-[11px] text-muted-foreground">No {providerFilter} work in this scene yet.</div>}
                <div className="flex items-center justify-between border-t border-border/70 px-4 py-3 sm:px-5"><span className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Continuity lock <span className="ml-1 text-green-300/80">active</span></span><button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground" onClick={() => setActiveTab('continuity')} data-testid="button-open-continuity">Open bible <ArrowUpRight size={12} /></button></div>
              </div>}

              {activeTab === 'timeline' && <div className="panel overflow-hidden p-5"><div className="mb-6 flex items-start justify-between"><div><p className="section-kicker mb-2">Assembly timeline</p><h2 className="font-display text-3xl text-foreground">A film in layers.</h2></div><button className="button-quiet flex items-center gap-2 px-2.5 py-2 text-[10px]" onClick={() => setShowCommand(true)} data-testid="button-timeline-settings"><Settings2 size={13} /> Timeline settings</button></div><div className="space-y-5">{scenes.map((scene, index) => <div key={scene.id} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3"><div className="font-mono-ui text-[10px] text-primary">0{index + 1}</div><div><div className="mb-2 flex items-center justify-between"><span className="text-[12px] font-medium">{scene.title}</span><span className="font-mono-ui text-[9px] text-muted-foreground">{scene.shots.length} shots</span></div><div className="flex h-9 gap-1">{scene.shots.length ? scene.shots.map((shot) => <button key={shot.id} className="group relative min-w-0 flex-1 overflow-hidden rounded border border-border/70 text-left" style={{ background: `linear-gradient(110deg, ${shot.tintA}, ${shot.tintB})` }} onClick={() => { selectScene(scene.id); setSelectedShotId(shot.id); setActiveTab('overview'); }} data-testid={`button-timeline-shot-${shot.id}`}><span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" /><span className="relative px-2 font-mono-ui text-[8px] text-foreground/80">{shot.code}</span></button>) : <div className="flex flex-1 items-center rounded border border-dashed border-border px-3 font-mono-ui text-[9px] text-muted-foreground">no material yet</div>}</div></div></div>)}</div></div>}

              {activeTab === 'continuity' && <div className="grid gap-4 sm:grid-cols-2"><div className="panel p-5"><div className="mb-4 flex items-center gap-2"><Layers3 size={15} className="text-accent" /><span className="section-kicker">World bible</span></div><h2 className="font-display text-3xl text-foreground">The world remembers.</h2><p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">A dry coastal republic, 2041. Salt, failing infrastructure, and long blue shadows. Every engine receives this context before it touches a frame.</p><div className="mt-5 space-y-2">{['35mm halation / restrained grain', 'Sodium practicals against sea-teal dusk', 'No clean glass, no symmetrical frames'].map((note) => <div key={note} className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2 text-[10px] text-foreground"><Check size={12} className="text-accent" />{note}</div>)}</div></div><div className="panel p-5"><div className="mb-4 flex items-center gap-2"><Bot size={15} className="text-primary" /><span className="section-kicker">Character lock</span></div><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-primary/10 font-display text-xl text-primary">M</div><div><h3 className="text-sm font-medium text-foreground">Mara Vale</h3><p className="text-[10px] text-muted-foreground">32 · weather archivist · carries a shortwave</p></div></div><div className="mt-5 space-y-3">{[['Silhouette', 'Angular coat, wet cuffs'], ['Performance', 'Watch first. Speak last.'], ['Anchor object', 'Brushed steel field radio']].map(([label, value]) => <div key={label} className="border-t border-border/70 pt-2"><div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-[11px] text-foreground">{value}</div></div>)}</div></div></div>}

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="panel p-4"><div className="mb-4 flex items-center justify-between"><span className="section-kicker">Generated</span><ImageIcon size={14} className="text-accent" /></div><div className="font-display text-3xl">04:18</div><p className="mt-1 text-[10px] text-muted-foreground">of 18:00 planned runtime</p></div>
                <div className="panel p-4"><div className="mb-4 flex items-center justify-between"><span className="section-kicker">In review</span><Clock3 size={14} className="text-primary" /></div><div className="font-display text-3xl">03</div><p className="mt-1 text-[10px] text-muted-foreground">decisions need your eye</p></div>
                <div className="panel p-4"><div className="mb-4 flex items-center justify-between"><span className="section-kicker">Engines</span><Wand2 size={14} className="text-green-300/80" /></div><div className="font-display text-3xl">{activeProviders.length}</div><p className="mt-1 text-[10px] text-muted-foreground">providers carrying the film</p></div>
              </div>
            </section>

            <aside className="chat-panel panel">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-4">
                <div className="flex items-center gap-2.5"><span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary"><Bot size={16} /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-card bg-green-300/80" /></span><div><div className="text-[12px] font-semibold text-foreground">Co-director</div><div className="font-mono-ui text-[9px] text-muted-foreground">online · context loaded</div></div></div>
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" onClick={() => setShowCommand(true)} data-testid="button-chat-options"><PanelRight size={15} /></button>
              </div>
              <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3"><span className="section-kicker">Working on</span><button className="flex items-center gap-1.5 rounded bg-secondary px-2 py-1 font-mono-ui text-[9px] text-foreground" onClick={() => setActiveTab('overview')} data-testid="button-chat-context">SC {activeScene.number} · {activeScene.title}<ChevronDown size={11} /></button></div>
              <div className="flex-1 space-y-4 overflow-auto px-4 py-5">
                {messages.map((message) => <div key={message.id} className={`chat-message ${message.role === 'user' ? 'ml-7' : ''}`}><div className={`rounded-lg px-3 py-3 text-[11px] leading-relaxed ${message.role === 'user' ? 'bg-primary/15 text-foreground' : 'bg-secondary/70 text-muted-foreground'}`}>{message.role === 'assistant' && <div className="mb-2 flex items-center gap-1.5 font-mono-ui text-[9px] uppercase tracking-wider text-primary"><Sparkles size={11} /> co-director</div>}<p>{message.text}</p>{message.chips && <div className="mt-3 flex flex-wrap gap-1.5">{message.chips.map((chip) => <button key={chip} className="rounded border border-border bg-background/30 px-2 py-1.5 text-left text-[10px] text-foreground transition-colors hover:border-primary/50 hover:text-primary" onClick={() => sendMessage(chip)} data-testid={`button-suggestion-${chip.replaceAll(' ', '-').toLowerCase()}`}>{chip}</button>)}</div>}</div></div>)}
                <div className="flex items-center gap-2 px-1 pt-1 text-[10px] text-muted-foreground"><Lightbulb size={13} className="text-accent" /> Tip: describe the feeling, not the frame.</div>
              </div>
              <div className="p-3">
                <form className="chat-composer p-2" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
                  <textarea value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Tell me what you see..." rows={2} className="w-full resize-none bg-transparent px-1 py-1 text-[11px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground" data-testid="input-chat-composer" />
                  <div className="flex items-center justify-between pt-1"><div className="flex items-center gap-1"><button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" onClick={() => setShowCommand(true)} data-testid="button-attach-context"><FolderOpen size={14} /></button><button type="button" className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" onClick={() => setShowCommand(true)} data-testid="button-chat-tools"><SlidersHorizontal size={14} /></button></div><button type="submit" className="button-primary flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold" data-testid="button-send-message">Send <Send size={12} /></button></div>
                </form>
                <div className="mt-2 flex items-center justify-between px-1"><span className="font-mono-ui text-[8px] uppercase tracking-wider text-muted-foreground">director mode</span><span className="flex items-center gap-1 text-[9px] text-muted-foreground"><AudioLines size={11} /> voice notes ready</span></div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {selectedShot && <div className="fixed bottom-5 right-5 z-40 hidden w-[288px] rounded-xl border border-border bg-popover p-4 shadow-2xl shadow-black/30 lg:block" data-testid="panel-selected-shot">
        <div className="mb-3 flex items-center justify-between"><span className="section-kicker">Selected shot / {selectedShot.code}</span><button className="text-muted-foreground hover:text-foreground" onClick={() => setSelectedShotId('')} data-testid="button-close-shot-panel"><X size={14} /></button></div>
        <div className="mb-3 h-24 overflow-hidden rounded-lg border border-border/70" style={{ background: `linear-gradient(120deg, ${selectedShot.tintA}, ${selectedShot.tintB})` }}><div className="flex h-full items-center justify-center bg-black/15"><button className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/35 bg-background/30 text-foreground backdrop-blur-sm" onClick={() => setShowCommand(true)} data-testid="button-preview-shot"><Play size={14} fill="currentColor" /></button></div></div>
        <h3 className="text-[12px] font-semibold text-foreground">{selectedShot.title}</h3><p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{selectedShot.description}</p>
        <div className="mt-3 grid grid-cols-2 gap-2"><label className="text-[9px] text-muted-foreground">Generation engine<select value={selectedShot.provider} onChange={(event) => updateShot(selectedShot.id, { provider: event.target.value as Provider })} className="mt-1 w-full rounded border border-border bg-secondary px-2 py-1.5 text-[10px] text-foreground outline-none" data-testid="select-shot-provider"><option>Veo 3</option><option>Runway Gen-4</option><option>Luma Ray 2</option><option>ElevenLabs</option></select></label><div className="text-[9px] text-muted-foreground">Status<button className="mt-1 flex w-full items-center gap-1.5 rounded border border-border bg-secondary px-2 py-1.5 text-left text-[10px] text-foreground" onClick={() => cycleShotStatus(selectedShot)} data-testid="button-shot-status"><span className={`status-dot ${statusClass(selectedShot.status)}`} />{statusLabel(selectedShot.status)}<RefreshCcw size={10} className="ml-auto" /></button></div></div>
        <button className="button-primary mt-3 flex w-full items-center justify-center gap-2 py-2 text-[10px] font-semibold disabled:cursor-not-allowed disabled:opacity-50" onClick={renderSelectedShot} disabled={selectedShot.status === 'rendering'} data-testid="button-render-selected-shot">{selectedShot.status === 'rendering' ? <><LoaderCircle size={13} className="animate-spin" /> Rendering pass...</> : <><Wand2 size={13} /> Render new pass</>}</button>
      </div>}

      {showNewScene && <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-5" onClick={() => setShowNewScene(false)}><div className="modal-card w-full max-w-md rounded-xl border border-border bg-popover p-6 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-start justify-between"><div><p className="section-kicker mb-2">New scene</p><h2 className="font-display text-3xl text-foreground">What happens next?</h2><p className="mt-2 text-[11px] text-muted-foreground">Start with a title. Place and shot logic can come later.</p></div><button className="text-muted-foreground hover:text-foreground" onClick={() => setShowNewScene(false)} data-testid="button-close-new-scene"><X size={16} /></button></div><form onSubmit={addScene}><label className="section-kicker">Scene title<input autoFocus value={newSceneTitle} onChange={(event) => setNewSceneTitle(event.target.value)} placeholder="e.g. The Long Way Back" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" data-testid="input-new-scene-title" /></label><div className="mt-6 flex justify-end gap-2"><button type="button" className="button-quiet px-3 py-2 text-[11px]" onClick={() => setShowNewScene(false)} data-testid="button-cancel-new-scene">Keep thinking</button><button type="submit" className="button-primary flex items-center gap-2 px-3 py-2 text-[11px] font-semibold" data-testid="button-create-new-scene"><Plus size={13} /> Create scene</button></div></form></div></div>}

      {showCommand && <div className="modal-backdrop fixed inset-0 z-50 flex items-start justify-center p-5 pt-[13vh]" onClick={() => setShowCommand(false)}><div className="command-popover w-full max-w-lg rounded-xl border border-border bg-popover shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}><div className="flex items-center gap-3 border-b border-border px-4 py-3"><Search size={16} className="text-muted-foreground" /><input autoFocus placeholder="Search scenes, shots, notes..." className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" data-testid="input-command-search" /><span className="font-mono-ui text-[9px] text-muted-foreground">esc</span><button className="text-muted-foreground hover:text-foreground" onClick={() => setShowCommand(false)} data-testid="button-close-command"><X size={15} /></button></div><div className="p-2"><p className="section-kicker px-2 py-2">Quick actions</p>{[{ icon: Wand2, label: 'Render selected shot', action: renderSelectedShot }, { icon: Plus, label: 'Create a new scene', action: () => { setShowCommand(false); setShowNewScene(true); } }, { icon: MessageSquareText, label: 'Ask co-director for a pass', action: () => { setShowCommand(false); sendMessage('Give me the next most important decision in this film'); } }].map((item) => { const Icon = item.icon; return <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[12px] text-foreground transition-colors hover:bg-secondary" onClick={item.action} data-testid={`button-command-${item.label.replaceAll(' ', '-').toLowerCase()}`}><span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-primary"><Icon size={14} /></span>{item.label}<ChevronRight size={13} className="ml-auto text-muted-foreground" /></button>; })}</div><div className="flex items-center gap-3 border-t border-border px-4 py-3 text-[10px] text-muted-foreground"><Command size={12} /> Your film context is available to every action.</div></div></div>}
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;