# Real-Time Multimodal / Voice Assistant — flagship blueprint

Status: **Interactive UX Prototype**. The browser exercises idle, listening, thinking, speaking, interrupted, confirming, completed, and reset behavior. It does not capture audio or call any paid provider.

## Product contract

- Inputs: audio events, optional image snapshot, session policy, permitted tool schemas.
- Outputs: streamed response events, confirmed tool result, stage latency trace, or human handoff.
- Invariants: stale speech is cancelled after barge-in; every write requires explicit confirmation; credentials never reach the browser.

## First executable slice

1. Run browser audio over local SmallWebRTC with synthetic transcription fallback.
2. Implement explicit endpointing and cancellation tokens.
3. Add a read-only availability tool and one confirmation-gated synthetic booking tool.
4. Instrument capture, endpoint, STT, model, tool, TTS, and playback stages.
5. Test provider timeout, reconnect, interruption, ambiguous slot, denial, and handoff.

## Latency budget

The current ≤800 ms end-of-speech-to-first-audio value is a target, not evidence. Measure each stage and report p50/p95, device, network, codec, region, provider, and warm/cold condition.

## Security and cost

Audio retention defaults off; consent and recording state are visible. Compare self-hosted/browser WebRTC, hosted WebRTC, and PSTN separately. No account, credit, phone number, or paid stream is authorized for this milestone.

## Milestones

- M1 complete: tested state-machine UX.
- M2: local audio transport and cancellation.
- M3: bounded tool calls and stage telemetry.
- M4: hosted transport evaluation only after explicit approval.

