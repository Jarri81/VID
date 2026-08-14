# Director Studio

## Product Specification

**Document status:** Product and systems specification  
**Version:** 0.1  
**Date:** 2026-08-13  
**Product type:** Long-form AI filmmaking and media orchestration workspace  
**Primary artifact:** Director Studio web application  

---

## 1. Executive summary

Director Studio is a director-facing system for turning broad creative intent into coherent, long-form audiovisual productions by orchestrating multiple AI media providers.

The user should be able to write or speak an extensive request in natural language, attach scripts and references, or provide only a rough idea. Director Studio interprets the request, explains what the currently connected AI systems can and cannot do, creates a feasible production plan, routes each task to the best available provider, preserves continuity, and assembles approved outputs into scenes and films.

The product is not primarily a video generation model. It is the layer above the models:

```text
Creative intent
    ↓
Story and production interpretation
    ↓
Capability-aware plan
    ↓
Dependency-aware media jobs
    ↓
Continuity and quality checks
    ↓
Human review and approvals
    ↓
Scene and film assembly
```

The system must remain useful as providers change. Providers are interchangeable capability sources, not the product identity.

### Core promise

> Give Director Studio the film you imagine, in as much detail as you want. It will translate your intent into a feasible production, select the right AI systems for each part, preserve continuity, and keep working until there is a finished film.

### Product thesis

The durable advantage is continuity-aware orchestration:

- The user directs in creative language.
- The system converts creative intent into structured production work.
- Each provider is used for the capability it performs best.
- The film bible is the source of truth for every generation.
- Audio, dialogue, lip-sync, visual continuity, review, and final assembly are first-class.
- The system is honest about limitations and proposes the best achievable alternative instead of silently degrading the request.

---

## 2. Problem statement

Current AI video tools are strong at short, isolated generations but weak at long-form authorship.

Users can often generate:

- A short clip
- A concept frame
- A talking avatar
- A voice line
- A music track
- A sound effect

They struggle to produce a coherent film because they must manually manage:

- Character identity
- Wardrobe and props
- Locations
- Scene geography
- Emotional state
- Dialogue timing
- Voice assignments
- Lip-sync
- Camera language
- Shot-to-shot transitions
- Music and sound continuity
- Provider-specific prompts
- Generation failures
- Version history
- Final assembly

The user is forced to become the integration layer between dozens of disconnected products.

Director Studio removes that burden while retaining directorial control.

### The problem we are solving

> How can a director express an ambitious, open-ended creative request once, then have the system adapt that request to the capabilities and limitations of the current AI ecosystem while preserving the intended film?

### The problem we are not solving

Director Studio is not initially:

- A general-purpose social video editor
- A stock footage marketplace
- A simple text-to-video prompt box
- A replacement for every professional nonlinear editor
- A guarantee of perfect one-pass feature-film generation
- A fully autonomous creative agent that makes irreversible choices without approval

---

## 3. Product goals

### 3.1 Primary goals

1. Accept extremely broad and detailed creative requests.
2. Understand intent without forcing users through rigid forms.
3. Convert intent into an editable, feasible production plan.
4. Adapt plans to live provider capabilities.
5. Route each media task to the most suitable connected provider.
6. Preserve character, location, wardrobe, voice, camera, and sound continuity.
7. Support both structured and conversational directing workflows.
8. Support multiple speaking characters and dedicated lip-sync passes.
9. Produce short previews before expensive final renders.
10. Make every important generation reviewable, versioned, and reversible.
11. Assemble approved shots into scenes, acts, and films.
12. Show cost, time, dependencies, and quality tradeoffs before execution.

### 3.2 Secondary goals

1. Allow providers to be added without redesigning the product.
2. Allow the system to use different providers for different shots within the same scene.
3. Support voice, music, ambience, Foley, SFX, subtitles, dubbing, and export.
4. Preserve user ownership of creative decisions and uploaded assets.
5. Make failed generations recoverable rather than destructive.
6. Make the first five minutes understandable to a non-technical filmmaker.

### 3.3 Non-goals for the first production release

1. Perfect arbitrary multi-person lip-sync in every visual style.
2. One continuous 90-minute generation request.
3. Automatic approval of all generated media.
4. Full professional color grading and mastering parity with high-end NLEs.
5. Training a proprietary foundation video model.
6. Supporting every available provider on day one.
7. Full real-time collaborative editing with frame-level multiplayer cursors.

---

## 4. Product principles

### 4.1 Creative language first

The user should be able to say what they want creatively:

> “Make the scene feel like grief disguised as routine.”

The system should infer production implications and surface assumptions, rather than asking the user to translate the thought into model-specific syntax.

### 4.2 Plan before spend

Expensive jobs should never begin invisibly.

The system should first show:

- What it understood
- What it will create
- Which providers it plans to use
- Expected duration
- Expected cost range
- Known risks
- Decisions that need approval

The user can enable an automatic mode, but automatic mode still creates an inspectable plan.

### 4.3 Capability-aware, not provider-centric

The user asks for a result. The user should not need to know whether MiniMax, fal.ai, Replicate, HeyGen, ElevenLabs, or another provider executes each job.

Provider names remain visible for transparency and override, but the primary abstraction is capability:

- Cinematic video
- Image-to-video
- Character performance
- Lip-sync
- Voice synthesis
- Dialogue timing
- Music
- Sound effects
- Dubbing
- Assembly

### 4.4 Continuity is a system responsibility

The user should not have to manually paste the character description into every prompt.

The film bible, scene state, approved references, and locked decisions are automatically applied to relevant jobs.

### 4.5 Progressive commitment

The system should move from cheap and reversible work to expensive and final work:

```text
Interpretation
    ↓
Story outline
    ↓
Scene plan
    ↓
Shot plan
    ↓
Storyboard / keyframes
    ↓
Motion preview
    ↓
Audio and lip-sync
    ↓
Final render
```

### 4.6 Fail transparently

When the ideal request is not currently possible, the system must say:

1. Which requirement is not reliably supported.
2. Which connected providers were evaluated.
3. What alternative plan is recommended.
4. What quality difference the alternative introduces.
5. Whether the user can override the recommendation.

### 4.7 The user owns the final decision

The co-director can recommend, decompose, route, and execute, but the user can:

- Lock a choice
- Reject a recommendation
- Choose a provider
- Choose a take
- Edit a prompt or scene
- Regenerate only a selected asset
- Branch the project
- Roll back

---

## 5. Target users

### 5.1 Auteur creator

A filmmaker with a strong concept who wants to direct beyond the limits of traditional production budgets.

Needs:

- Creative control
- Visual consistency
- Character continuity
- Strong scene construction
- Alternate performances
- Human approval at important moments

### 5.2 Writer-director

A writer who has a screenplay or treatment and wants to transform it into audiovisual scenes.

Needs:

- Script ingestion
- Scene breakdown
- Dialogue extraction
- Character casting
- Shot planning
- Versioned adaptation from script to screen

### 5.3 Small production team

A team of two to ten people coordinating AI-generated assets.

Needs:

- Shared project state
- Review queues
- Comments
- Approvals
- Provider and cost transparency
- Asset organization

### 5.4 Commercial creative team

A team producing campaigns, trailers, branded shorts, or music videos.

Needs:

- Fast iteration
- Brand reference packs
- Multi-format output
- Multiple variants
- Clear provenance
- Rights and consent tracking

### 5.5 Advanced AI creator

A technically experienced user who wants provider-level control without building their own orchestration system.

Needs:

- Manual provider override
- Custom prompts
- Model parameters
- Webhooks and APIs
- Job logs
- Reproducible versions

---

## 6. Product vocabulary

### Film

The top-level creative project. A film may be a feature, short, episode, trailer, music video, documentary, commercial, or experimental work.

### Film bible

The canonical source of truth for story, characters, locations, visual language, sound language, production constraints, and approved references.

### Act

A major story grouping. Acts are optional for shorter projects.

### Scene

A continuous dramatic unit with a location, time, characters, objective, conflict, and emotional progression.

### Beat

A narrative or emotional moment within a scene.

### Shot

The smallest visual production unit that can be generated, reviewed, versioned, and assembled.

### Take

A generated version of a shot or performance.

### Asset

Any reusable media or reference item: image, video, audio, voice, music, SFX, script, document, keyframe, or subtitle file.

### Job

An executable provider operation, such as generating a video, synthesizing dialogue, producing a sound effect, or assembling a scene.

### Render graph

The dependency graph connecting assets and jobs.

### Continuity lock

A user-approved rule that the system must preserve across future generations.

### Capability

A normalized operation that a provider may support, such as image-to-video, lip-sync, or voice synthesis.

### Provider adapter

The application layer that translates normalized Director Studio jobs into provider-specific API requests and converts responses back into normalized results.

### Co-director

The conversational system that interprets user intent, creates plans, explains tradeoffs, and controls execution.

---

## 7. Core user experience

## 7.1 Entry points

The user can begin from:

1. A blank film
2. A short idea
3. A long natural-language brief
4. A screenplay
5. A treatment
6. A novel or document
7. A voice note
8. An image or moodboard
9. Existing video footage
10. A template such as “music video,” “feature film,” “commercial,” or “episode”

The system should not require the user to choose a mode first. It should infer the likely mode and ask for confirmation only when necessary.

## 7.2 Initial intake

The intake experience should accept:

- Long text
- Markdown
- PDF or document files
- Images
- Audio notes
- Video references
- Multiple attachments

The initial response should contain:

1. A concise interpretation
2. A project type recommendation
3. A first production outline
4. A feasibility report
5. A list of assumptions
6. A proposed next action

Example:

```text
I understand this as an 80–90 minute psychological science-fiction feature.

I recommend:
- 4 acts
- 18 scenes
- 3 principal characters
- 2 recurring locations
- 5 visual reference packs
- approximately 400–550 controlled shots

The most reliable workflow is scene-by-scene generation with separate dialogue,
lip-sync, and final assembly.

The highest-risk elements are:
- long continuous shots
- overlapping multi-character dialogue
- reflection continuity

I can begin with a 90-second proof of concept for the most difficult scene.
```

## 7.3 Three directing modes

### Guided mode

The system proposes a plan and waits for approval at meaningful gates.

Best for:

- First-time users
- Feature projects
- Expensive renders
- Complex scenes

### Director mode

The user works scene by scene and controls shot, performance, camera, voice, and sound decisions.

Best for:

- Auteur workflows
- Experimental work
- High creative control

### Autonomous production mode

The user describes the desired result and allows the system to plan, route, generate, retry, and assemble with defined budgets and approval rules.

Best for:

- Prototypes
- Trailers
- Variants
- Background shots
- Low-risk sequences

Autonomous mode must still stop for:

- Budget threshold breaches
- Continuity failures
- Rights or consent issues
- Repeated provider failures
- Material changes to story intent

## 7.4 Conversational directing

The co-director must support:

- Open-ended questions
- Long creative briefs
- Incremental refinement
- References to earlier decisions
- References to scenes and shots
- “Make it more…” direction
- Global changes
- Local changes
- Negative constraints
- Provider preferences
- Cost and speed preferences
- Approval commands

Examples:

- “Make the whole film feel less polished and more documentary.”
- “Keep the same Mara from Scene 1, but she has not slept for three days.”
- “Use the cheapest provider for background shots, but never for close-ups.”
- “Regenerate only the mouth performance. Keep the face, camera, and lighting.”
- “Show me what is blocking the final cut.”
- “Find every scene where Elias speaks and make his voice ten percent quieter.”
- “Make the last scene reinterpret the mirror motif from the opening.”

## 7.5 Structured directing

Every conversational decision should be inspectable and editable through structured views:

- Story outline
- Film bible
- Character bible
- Scene board
- Shot list
- Timeline
- Continuity view
- Audio view
- Provider and job view
- Review queue
- Cost and usage view

The user can switch between conversation and structured editing without losing context.

---

## 8. Adaptive request-to-production pipeline

## 8.1 Request interpretation

The system extracts:

### Creative intent

- Theme
- Genre
- Mood
- Tone
- Audience
- Emotional trajectory
- Influences
- Desired novelty

### Narrative structure

- Premise
- Characters
- Relationships
- Locations
- Timeline
- Acts
- Scenes
- Beats
- Dialogue
- Ending

### Visual direction

- Art direction
- Color language
- Lighting
- Camera movement
- Framing
- Lens feel
- Aspect ratio
- Texture
- Pacing
- Visual motifs

### Audio direction

- Dialogue
- Voice characteristics
- Music
- Silence
- Ambience
- Foley
- Sound effects
- Language
- Dubbing

### Production constraints

- Duration
- Resolution
- Frame rate
- Aspect ratio
- Deadline
- Budget
- Connected providers
- Human review level
- Rights restrictions
- Content restrictions

### Uncertainty

- Ambiguous characters
- Conflicting instructions
- Missing references
- Unspecified ending
- Impossible technical requirements
- Unknown provider support

## 8.2 Feasibility analysis

The system creates a feasibility report with:

- Fully supported requirements
- Partially supported requirements
- High-risk requirements
- Unsupported requirements
- Recommended substitutions
- Estimated cost range
- Estimated time range
- Required human review

The feasibility report should use confidence levels:

```text
High confidence
Medium confidence
Experimental
Not currently reliable
```

## 8.3 Plan generation

The planner creates:

1. Story plan
2. Character plan
3. Location plan
4. Scene plan
5. Shot plan
6. Audio plan
7. Provider plan
8. Render graph
9. Review plan
10. Assembly plan

The plan must be editable before execution.

## 8.4 Plan negotiation

The system should offer alternatives when the request is too expensive, too long, or technically risky.

Example:

```text
Option A — highest control
18 scenes, 480 shots, separate dialogue and lip-sync
Estimated quality: highest
Estimated cost: high
Estimated time: long

Option B — balanced
18 scenes, 280 shots, native audio for background dialogue
Estimated quality: high
Estimated cost: medium
Estimated time: medium

Option C — proof of concept
3 scenes, 42 shots, one polished sequence
Estimated quality: high
Estimated cost: low
Estimated time: short
```

## 8.5 Execution

Execution is asynchronous and event-driven.

Every job has:

- Status
- Provider
- Input assets
- Output assets
- Dependencies
- Retry policy
- Cost estimate
- Actual cost when available
- Logs
- Error details
- Quality checks
- Review state

## 8.6 Adaptive replanning

The planner must replan when:

- A provider fails
- A provider is unavailable
- A model changes capabilities
- A continuity check fails
- A user approves a different take
- A user changes a locked character detail
- A budget is exceeded
- A new asset invalidates downstream work

Replanning must preserve approved work whenever possible.

---

## 9. Provider and capability architecture

## 9.1 Capability registry

The system maintains a normalized registry of live provider capabilities.

Each capability record includes:

```text
provider
provider_model
capability
input_types
output_types
max_duration
supported_resolutions
reference_support
audio_support
character_consistency_support
lip_sync_support
multi_character_support
cost_model
queue_behavior
rate_limits
regional_availability
quality_confidence
last_verified_at
```

The registry must support:

- Manual provider metadata
- Provider documentation metadata
- Runtime capability probes
- Health checks
- Model deprecation
- Version changes
- Temporary outages

## 9.2 Initial provider lanes

### MiniMax

Potential role:

- General-purpose video generation
- Multimodal scene prototyping
- Image generation
- Audio-capable experiments

### fal.ai

Potential role:

- Specialist model routing
- Image-to-video
- Lip-sync
- Video enhancement
- Experimental model access

### Replicate

Potential role:

- Specialist model routing
- Model experimentation
- Fallback generation
- Research and evaluation

### ElevenLabs

Potential role:

- Character voice synthesis
- Dialogue
- Dubbing
- Transcription
- Sound effects
- Voice casting

### HeyGen

Potential role:

- Talking-character shots
- Avatar scenes
- Lip-sync
- Translation
- Voice replacement

### Shotstack

Potential role:

- Scene assembly
- Timeline rendering
- Audio mixing
- Subtitles
- Final export

## 9.3 Provider adapter contract

Every adapter should normalize:

### Input

- Job type
- Prompt
- Reference assets
- Character constraints
- Scene constraints
- Audio inputs
- Parameters
- Callback or polling configuration

### Output

- Provider job ID
- Normalized status
- Output asset paths
- Provider metadata
- Usage and cost
- Warnings
- Error type
- Retryability

The rest of Director Studio must not depend directly on provider-specific response shapes.

## 9.4 Routing rules

Routing should consider:

1. Required capability
2. Media type
3. Quality target
4. Continuity requirements
5. Character count
6. Lip-sync requirement
7. Audio requirement
8. Duration
9. Resolution
10. Cost limit
11. Time limit
12. Provider health
13. User preference
14. Existing project assets
15. Prior approved provider usage

The user can choose:

- Automatic routing
- Preferred provider
- Provider allowlist
- Provider denylist
- Cheapest acceptable
- Fastest acceptable
- Highest quality
- Experimental mode

---

## 10. Film data model

The following is the conceptual model. Exact database implementation may evolve.

## 10.1 Film

Fields:

- `id`
- `title`
- `logline`
- `format`
- `target_duration`
- `target_aspect_ratio`
- `target_resolution`
- `target_frame_rate`
- `genre`
- `tone`
- `status`
- `production_mode`
- `budget_limit`
- `time_limit`
- `created_at`
- `updated_at`

## 10.2 Film bible

Fields:

- `film_id`
- `story_rules`
- `visual_rules`
- `audio_rules`
- `continuity_rules`
- `negative_rules`
- `reference_asset_ids`
- `locked_fields`
- `version`

## 10.3 Character

Fields:

- `id`
- `film_id`
- `name`
- `description`
- `narrative_role`
- `physical_traits`
- `appearance_rules`
- `wardrobe_rules`
- `movement_rules`
- `voice_id`
- `voice_style`
- `speech_rules`
- `emotional_profile`
- `reference_asset_ids`
- `forbidden_changes`
- `continuity_status`

## 10.4 Character scene state

Fields:

- `character_id`
- `scene_id`
- `age_or_appearance_state`
- `wardrobe_state`
- `emotional_state`
- `physical_state`
- `relationship_state`
- `knowledge_state`
- `injury_or_prop_state`
- `approved_reference_asset_ids`

This prevents the system from treating a character as visually static when the story requires progression.

## 10.5 Location

Fields:

- `id`
- `film_id`
- `name`
- `description`
- `spatial_rules`
- `visual_rules`
- `lighting_rules`
- `prop_rules`
- `reference_asset_ids`
- `continuity_status`

## 10.6 Scene

Fields:

- `id`
- `film_id`
- `act_id`
- `number`
- `title`
- `purpose`
- `location_id`
- `time_of_day`
- `story_time`
- `characters`
- `beats`
- `dialogue`
- `visual_direction`
- `audio_direction`
- `status`
- `continuity_status`
- `approved_version_id`

## 10.7 Beat

Fields:

- `id`
- `scene_id`
- `order`
- `description`
- `dramatic_function`
- `emotional_state`
- `required_assets`
- `coverage_requirements`

## 10.8 Shot

Fields:

- `id`
- `scene_id`
- `number`
- `title`
- `shot_type`
- `duration`
- `camera_direction`
- `composition`
- `action`
- `characters`
- `dialogue_cue_ids`
- `reference_asset_ids`
- `continuity_constraints`
- `provider_route`
- `status`
- `selected_take_id`
- `approved_version_id`

## 10.9 Dialogue cue

Fields:

- `id`
- `shot_id`
- `speaker_character_id`
- `text`
- `start_time`
- `end_time`
- `delivery_direction`
- `emotion`
- `voice_id`
- `language`
- `takes`
- `approved_audio_asset_id`

## 10.10 Media asset

Fields:

- `id`
- `film_id`
- `type`
- `storage_path`
- `mime_type`
- `duration`
- `width`
- `height`
- `checksum`
- `source_job_id`
- `provider`
- `provider_asset_id`
- `metadata`
- `rights_metadata`
- `created_at`

## 10.11 Render job

Fields:

- `id`
- `film_id`
- `scene_id`
- `shot_id`
- `job_type`
- `provider`
- `provider_model`
- `input_asset_ids`
- `depends_on_job_ids`
- `normalized_request`
- `provider_request`
- `status`
- `progress`
- `attempt_count`
- `estimated_cost`
- `actual_cost`
- `error_code`
- `error_message`
- `retryable`
- `created_at`
- `started_at`
- `completed_at`

## 10.12 Review

Fields:

- `id`
- `asset_id`
- `reviewer`
- `status`
- `notes`
- `continuity_flags`
- `dialogue_flags`
- `audio_flags`
- `visual_flags`
- `created_at`

## 10.13 Version

Fields:

- `id`
- `entity_type`
- `entity_id`
- `parent_version_id`
- `change_summary`
- `source_assets`
- `created_by`
- `created_at`

---

## 11. Character consistency system

## 11.1 Character reference pack

Every important character should have a reference pack containing:

- Front portrait
- Three-quarter portrait
- Profile portrait
- Full-body reference
- Wardrobe reference
- Expression reference
- Lighting reference
- Movement reference
- Approved performance stills
- Negative examples, when useful

The system should support generated references and user-uploaded references.

## 11.2 Continuity locks

Locks may apply to:

- Face
- Hair
- Body
- Wardrobe
- Accessories
- Voice
- Accent
- Age
- Location
- Props
- Lighting
- Color palette
- Camera language
- Relationship state

Locks must be visible and removable.

## 11.3 Continuity inheritance

When generating a shot, the system automatically resolves:

1. Film-level rules
2. Act-level rules
3. Scene-level rules
4. Character scene state
5. Shot-specific direction
6. User overrides

More local instructions may refine global instructions, but should not silently contradict locked rules.

## 11.4 Continuity verification

The system should inspect generated outputs with multimodal analysis where available.

Checks include:

- Face identity
- Wardrobe identity
- Hair and makeup
- Props
- Character count
- Speaker identity
- Location features
- Screen direction
- Lighting direction
- Time of day
- Dialogue accuracy
- Lip-sync quality
- Audio presence
- Subtitle alignment

Checks should produce warnings, not pretend to be perfect truth.

## 11.5 Continuity states

```text
Unverified
Pass
Pass with warnings
Needs review
Failed
Locked by user
```

---

## 12. Multi-character dialogue and lip-sync

## 12.1 Dialogue-first workflow

For dialogue-heavy shots:

1. Extract or draft dialogue.
2. Assign each line to a character.
3. Generate or approve voice performances.
4. Create a time-coded dialogue track.
5. Generate visual performance.
6. Apply lip-sync or facial performance pass.
7. Check speaker identity and timing.
8. Add room tone, Foley, and music.
9. Review and approve.

## 12.2 Speaker map

Each shot with dialogue needs a speaker map:

```text
speaker
line
start_time
end_time
voice_id
emotion
camera_visibility
lip_sync_required
overlap_group
```

## 12.3 Multi-character coverage

For complex scenes, the planner should recommend coverage:

- Master wide shot
- Two-shot
- Over-the-shoulder coverage
- Character close-ups
- Reaction shots
- Inserts
- Cutaways

This is more reliable than asking one generation model to maintain several characters, overlapping speech, complex blocking, and a moving camera in one uninterrupted take.

## 12.4 Lip-sync routing

The system should select a lip-sync route based on:

- Talking-head versus cinematic shot
- Number of visible speaking characters
- Face visibility
- Camera movement
- Profile angle
- Dialogue length
- Visual style
- Provider confidence

Potential routes:

- Native audio from a video provider for rough previews
- HeyGen for explicit talking-character shots
- Specialist lip-sync model through fal.ai
- Specialist lip-sync model through Replicate
- Separate facial performance pass

## 12.5 Multi-character lip-sync limitations

The system must disclose when a shot is risky:

- Multiple faces speaking simultaneously
- Faces partially hidden
- Rapid head turns
- Reflections
- Masks
- Extreme profiles
- Crowds
- Heavy stylization
- Overlapping dialogue

When risk is high, the planner should split the shot or generate coverage.

---

## 13. Audio, music, and sound design

Audio must be treated as a parallel production track, not an afterthought.

## 13.1 Audio layers

Each scene can contain:

1. Dialogue
2. Voice-over
3. Room tone
4. Ambience
5. Foley
6. SFX
7. Music
8. Transitions
9. Subtitles
10. Dubbing tracks

## 13.2 Audio workflow

```text
Scene emotion
    ↓
Sound palette
    ↓
Dialogue and voice
    ↓
Room tone and ambience
    ↓
Foley and SFX
    ↓
Music
    ↓
Mix and loudness check
```

## 13.3 Audio continuity

The system should preserve:

- Character voice
- Room tone
- Environmental conditions
- Distance from microphone
- Reverb character
- Music motifs
- Volume relationships
- Silence decisions

## 13.4 Music behavior

The director can request:

- A score motif for a character
- Music that changes with the act structure
- Silence instead of music
- Diegetic versus non-diegetic sound
- Alternate music stems
- A music cue that returns with variation

---

## 14. Review and approval system

## 14.1 Review levels

### Automatic

The system approves low-risk outputs when checks pass.

### Guided

The system pauses at scene and character milestones.

### Manual

The user approves every shot or take.

## 14.2 Review controls

Users can:

- Approve
- Reject
- Request alternate take
- Regenerate video only
- Regenerate audio only
- Regenerate lip-sync only
- Keep visual and replace voice
- Keep voice and replace visual
- Lock this result
- Apply this decision to similar shots

## 14.3 Review comments

Comments can be attached to:

- Whole film
- Act
- Scene
- Shot
- Timeline moment
- Audio cue
- Character
- Continuity warning

## 14.4 Version branching

The user should be able to create:

- Performance A
- Performance B
- Different provider version
- Different ending
- Different score
- Director’s cut
- Short cut
- Trailer cut

No approved version should be overwritten destructively.

---

## 15. Timeline and assembly

## 15.1 Assembly levels

1. Shot
2. Scene
3. Act
4. Film
5. Trailer
6. Social cut
7. Dubbing version

## 15.2 Timeline requirements

The first usable timeline should support:

- Video tracks
- Dialogue tracks
- Music tracks
- SFX tracks
- Room tone
- Subtitles
- Scene markers
- Review markers
- Version swapping
- Scene reordering
- Export presets

## 15.3 Automated assembly

The system may automatically:

- Place approved shots
- Match dialogue timing
- Add approved transitions
- Place music cues
- Normalize audio
- Add subtitles
- Flag gaps
- Flag collisions
- Create a rough cut

The system must show the user what was automated.

---

## 16. Conversational planner behavior

## 16.1 Response types

The co-director should be able to return:

- Explanation
- Clarifying question
- Creative interpretation
- Feasibility report
- Production plan
- Scene breakdown
- Shot list
- Provider recommendation
- Cost estimate
- Execution confirmation
- Progress update
- Review request
- Error explanation
- Replan proposal

## 16.2 When to ask questions

Ask only when:

- The answer materially changes the production plan.
- There is a conflict between explicit instructions.
- A legal or consent issue needs a decision.
- The cost difference is significant.
- The output cannot be safely inferred.

Otherwise, infer and show assumptions.

## 16.3 Assumption ledger

Every major plan should include an assumption ledger:

```text
Assumed Mara is the protagonist.
Assumed the film is in English.
Assumed a 16:9 master.
Assumed the mirror is practical, not supernatural in appearance.
Assumed the ending remains ambiguous.
```

The user can correct an assumption conversationally.

## 16.4 Broad request handling

The system should support long-running conversations about:

- Theme
- Story
- Character psychology
- Visual grammar
- Production strategy
- Budget
- Provider selection
- Shot alternatives
- Film analysis
- Rewrite requests
- Continuity changes

The system should maintain a distinction between:

- Conversation messages
- Canonical project decisions
- Temporary suggestions
- Approved production changes

Not every conversational idea should become canon automatically.

---

## 17. API and backend requirements

The backend should expose normalized endpoints for:

### Projects

- Create film
- List films
- Get film
- Update film
- Archive film

### Film bible

- Get bible
- Update bible
- Add reference
- Lock continuity field
- Unlock continuity field

### Characters

- Create character
- Update character
- List characters
- Add reference pack asset
- Set voice
- Update scene state

### Locations

- Create location
- Update location
- Add references

### Scenes

- Create scene
- Update scene
- List scenes
- Reorder scenes
- Generate scene plan
- Approve scene plan

### Shots

- Create shot
- Update shot
- List shots
- Generate shot plan
- Generate preview
- Generate final take
- Select take
- Lock take

### Conversations

- Create conversation
- Send message
- Stream co-director response
- Convert response into plan changes
- Show assumptions

### Providers

- List connected providers
- List capabilities
- Test provider connection
- Enable or disable provider
- Set provider preferences
- View provider health

### Planning

- Create plan
- Validate plan
- Estimate plan
- Approve plan
- Replan

### Jobs

- Create job
- Get job
- List jobs
- Retry job
- Cancel job
- Stream progress

### Reviews

- Create review
- Approve asset
- Reject asset
- Add comment
- Create alternate

### Assembly

- Create scene cut
- Create film cut
- Add track
- Add subtitle track
- Render export
- Get export status

All request and response contracts should be defined in OpenAPI before implementation.

---

## 18. Security, privacy, and rights

## 18.1 Provider credentials

Provider credentials must never be pasted into the visible application interface.

They must be handled through secure integrations or environment-managed secrets.

The UI should show:

- Connected
- Needs reauthorization
- Disabled
- Failed health check

It should never display secret values.

## 18.2 Voice consent

Voice cloning must include:

- Consent confirmation
- Ownership or authorization metadata
- Voice usage scope
- Ability to revoke
- Audit trail

## 18.3 Character and likeness rights

The system should distinguish:

- User-created fictional characters
- User-owned real people
- Licensed characters
- Public figures
- Uploaded references with unknown rights

The system should warn before executing risky requests.

## 18.4 Uploaded media

User assets should be stored in object storage with metadata in the database.

The system should track:

- Ownership
- Source
- License or consent state
- Usage restrictions
- Project scope
- Deletion state

## 18.5 Project privacy

Projects should be private by default.

Sharing should be explicit and scoped:

- View-only
- Comment
- Review
- Edit
- Admin

---

## 19. Cost and resource management

## 19.1 Estimates

Before execution, show:

- Estimated provider cost
- Estimated storage
- Estimated render time
- Estimated number of jobs
- Highest-risk cost drivers

## 19.2 Budgets

Users can set:

- Per-job budget
- Per-scene budget
- Per-film budget
- Daily budget
- Monthly budget

## 19.3 Cost-aware routing

The planner can optimize for:

- Lowest cost
- Fastest completion
- Highest quality
- Balanced result
- Cheapest previews, premium final takes

## 19.4 Preview strategy

The system should default to:

1. Low-cost storyboard
2. Low-resolution motion preview
3. Audio preview
4. Lip-sync preview
5. Final render after approval

---

## 20. Reliability and failure handling

## 20.1 Provider failures

Provider errors should be normalized:

- Authentication failure
- Rate limit
- Invalid request
- Content restriction
- Timeout
- Temporary outage
- Unsupported capability
- Output validation failure

## 20.2 Retry policy

Retries should be:

- Limited
- Backoff-based
- Visible
- Cost-aware
- Safe against duplicate billing

## 20.3 Partial completion

If some jobs succeed and others fail, the user should still be able to:

- Review completed outputs
- Replace the failed provider
- Retry only failed jobs
- Continue with placeholders
- Replan the affected scene

## 20.4 No silent degradation

The system must not quietly:

- Change a character
- Remove dialogue
- Replace a provider
- Lower resolution
- Change aspect ratio
- Drop sound
- Alter the story

Any material change must be visible.

---

## 21. Main application surfaces

### 21.1 Film overview

Purpose:

- See overall progress
- See blocked work
- See recent decisions
- Open active scenes
- View cost and provider coverage

### 21.2 Co-director

Purpose:

- Submit broad creative requests
- Refine intent
- Review feasibility
- Trigger plans and jobs
- Ask project-wide questions

### 21.3 Film bible

Purpose:

- Manage canonical rules
- Lock or unlock continuity
- Browse characters, locations, props, and references

### 21.4 Scene board

Purpose:

- Understand scene intent
- Review beats
- Navigate shots
- See providers and status

### 21.5 Timeline

Purpose:

- Assemble and review scenes
- Swap takes
- Control audio and subtitles
- Create cuts

### 21.6 Continuity view

Purpose:

- See character and location state across scenes
- Identify drift
- Review warnings
- Apply locks

### 21.7 Provider control

Purpose:

- See connected providers
- Understand capabilities
- Set preferences
- View health and usage

### 21.8 Review queue

Purpose:

- Review blocked or pending outputs
- Compare takes
- Approve, reject, or regenerate

---

## 22. First production milestone

The first useful production release should support one complete vertical slice:

```text
Natural-language brief
    ↓
Film and character bible
    ↓
One scene plan
    ↓
Three to five shots
    ↓
One speaking character
    ↓
ElevenLabs dialogue
    ↓
Video generation
    ↓
Lip-sync pass
    ↓
Sound effect and ambience
    ↓
Shotstack scene assembly
    ↓
Human review
    ↓
Exportable scene
```

This is more valuable than a broad dashboard with many unconnected buttons.

## 22.1 First vertical slice acceptance criteria

The user can:

1. Describe a scene in broad natural language.
2. See the system’s interpretation and assumptions.
3. Approve or edit the scene plan.
4. Define one character with references and a voice.
5. Generate at least three shots.
6. Generate a dialogue line for the character.
7. Apply lip-sync to a speaking shot.
8. Review multiple takes.
9. Lock an approved character result.
10. Assemble the scene with dialogue and ambience.
11. Export or preview the assembled scene.
12. Return later and see the same project state.

---

## 23. Phased implementation plan

## Phase 0 — Product foundation

Deliver:

- Product shell
- Film overview
- Co-director interface
- Scene and shot concepts
- Local demo data
- Provider-neutral visual language

Current status:

- Prototype exists.

## Phase 1 — Persistent project model

Deliver:

- Films
- Film bible
- Characters
- Locations
- Scenes
- Shots
- References
- Continuity locks
- Conversation history

## Phase 2 — Capability and provider layer

Deliver:

- Secure provider connections
- Capability registry
- Provider health
- Normalized adapters
- Usage tracking
- Automatic and manual routing

Initial providers:

- MiniMax
- ElevenLabs
- Shotstack
- fal.ai or Replicate
- HeyGen when needed

## Phase 3 — Planner and render graph

Deliver:

- Broad request interpretation
- Feasibility reports
- Plan generation
- Cost estimation
- Job graph
- Dependency management
- Retry and fallback
- Progress streaming

## Phase 4 — Continuity system

Deliver:

- Character reference packs
- Scene character state
- Location state
- Continuity locks
- Output checks
- Drift warnings
- Approved reference inheritance

## Phase 5 — Dialogue and lip-sync

Deliver:

- Dialogue extraction
- Speaker maps
- Voice assignment
- Time-coded dialogue
- Lip-sync routing
- Multi-character shot planning
- Audio review

## Phase 6 — Assembly and exports

Deliver:

- Scene timeline
- Film timeline
- Audio tracks
- Subtitles
- Alternate cuts
- Shotstack integration
- Export presets

## Phase 7 — Collaboration and scale

Deliver:

- Team roles
- Review assignments
- Comments
- Shared asset libraries
- API access
- Webhooks
- Production analytics

---

## 24. Success metrics

### Product quality

- Percentage of generated shots passing continuity review
- Percentage of dialogue shots passing lip-sync review
- Percentage of plans executed without manual rework
- Percentage of approved shots reused in final cuts

### User value

- Time from broad brief to first coherent scene
- Time saved versus manual provider hopping
- Number of revisions before approval
- Percentage of users returning to the same film project
- Number of scenes completed per project

### System quality

- Provider failure recovery rate
- Average successful job completion rate
- Cost estimate accuracy
- Plan-to-execution mismatch rate
- Percentage of jobs with traceable inputs and outputs

### Trust

- Percentage of material changes explicitly disclosed
- Consent metadata coverage for cloned voices and likenesses
- User approval rate for automatic routing
- Rollback success rate

---

## 25. Risks and mitigations

### Risk: provider capabilities change

Mitigation:

- Live capability registry
- Versioned provider adapters
- Health checks
- Runtime validation
- Fallback routes

### Risk: character consistency remains imperfect

Mitigation:

- Reference packs
- Continuity locks
- Shorter controlled shots
- Approved references
- Multimodal validation
- Human review gates

### Risk: costs become unpredictable

Mitigation:

- Preflight estimates
- Budgets
- Cheap previews
- Per-job approval thresholds
- Cost-aware routing

### Risk: users lose creative control

Mitigation:

- Assumption ledger
- Editable plans
- Visible provider routing
- Version branches
- Non-destructive changes

### Risk: system becomes too complex

Mitigation:

- Conversational default
- Progressive disclosure
- Simple first-run flow
- Advanced controls only when requested
- Clear explanation of production decisions

### Risk: output feels like disconnected AI clips

Mitigation:

- Film bible as source of truth
- Scene and shot planning
- Audio continuity
- Repeated visual motifs
- Scene-level review
- Assembly before final evaluation

---

## 26. Definition of done for the product direction

Director Studio is delivering on its central promise when a user can:

1. Give the system a broad, extensive creative request.
2. Attach references or supporting material.
3. Receive an intelligent interpretation instead of a rigid form.
4. See what current AI systems can reliably deliver.
5. See what must be approximated or split into multiple passes.
6. Approve an adaptive production plan.
7. Watch the system route work across providers.
8. Trust that character, voice, location, and sound continuity are being tracked.
9. Generate scenes with multiple speaking characters.
10. Review lip-sync and performance quality.
11. Regenerate only the failed layer.
12. Assemble approved results into a coherent scene and film.
13. Understand cost, time, failures, and compromises.
14. Retain final creative authority at every important decision.

---

## 27. Final product statement

Director Studio is a natural-language, continuity-aware production system for long-form AI filmmaking.

The user brings the imagination.

The system brings:

- Interpretation
- Planning
- Provider intelligence
- Character memory
- Dialogue and lip-sync coordination
- Sound design
- Quality control
- Review
- Assembly
- Adaptation as the AI ecosystem changes

The final product should make the fragmented AI media landscape feel like one responsive creative machine.