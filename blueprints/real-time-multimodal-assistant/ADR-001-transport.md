# ADR-001: browser WebRTC before telephony

Decision: validate the media and state pipeline with a local/self-hosted WebRTC path before evaluating hosted media or PSTN.

Why: browser voice needs bidirectional low-latency media and barge-in. Local transport keeps the first executable slice at ₹0 and avoids exposing API keys.

Rejected: paid telephony-first development, browser-to-provider credentials, and a raw WebSocket default without a measured reason.

