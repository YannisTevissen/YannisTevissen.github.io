---
layout: post
title: "My early journey in Physical AI"
date: 2026-03-05 12:00:00
description: Combining a SO-101 arm with Reachy Mini, training SmolVLA on custom teleoperated data, and bringing physical AI to the desk.
tags: [physical-ai, robotics, VLA, Reachy, SmolVLA]
categories: [robotics]
related_posts: false
---

Awhile ago, I started growing interest in physical AI: how could the already powerful AI models be used for real physical tasks, and ultimately for better autonomy?

So when it was open sourced, I built a SO-100, then a SO-101. I mounted the latter to my wheelchair and recorded a nice video.

{% include video.liquid path="/assets/video/robot_wheelchair.mp4" controls=true caption="SO-101 arm mounted on my wheelchair." %}

But like most robotic videos back then it was carefully recorded and teleoperated to create the illusion of a useful robot. It was not yet.

A few months later, Hugging Face and Pollen Robotics launched Reachy Mini, so I bought and built the Lite version. It was ready for some Christmas magic and family demos.

Then, a few weeks ago, I thought: what about combining both robots? The arm needs a front camera if I want to make it autonomous on some tasks, and Reachy needs an arm to interact with the world around it.

So after wiring up the two cameras (Reachy's and the one mounted on the arm wrist), the big challenge was the teleoperation.

Due to my disability I cannot use a leader arm, as most teleoperators do. Training in a simulation was also not an option due to my setting, which is particularly difficult (reflective table, complex background, small pen).

So I built a small teleoperation app to directly control the follower SO-101 arm with my phone using two joysticks.

After some warmup trials, I recorded ~50 episodes of the arm picking up a pen and showing it to Reachy.

Then I used these episodes to finetune SmolVLA. I tried LoRA finetuning and full finetuning but I finally got better results with the full finetuning that took about 9 hours on my MacBook Pro M3.

{% include figure.liquid path="/assets/img/robot_training.png" alt="Training loss and gradient norm: full finetuning vs LoRA r=16" caption="Training curves: full finetuning (fft) vs LoRA r=16 — lower loss with full finetuning." %}

And here was the result!

{% include video.liquid path="/assets/video/IMG_2898.mov" controls=false caption="Reachy and SO-101 acting together" %}

I must say it feels weird to see a model I trained *act* in the real world. Physical AI is really something else and even though I know how it works, it still felt a bit like magic.

Now I can iterate over this prototype and build new use cases using my two robots. I plan to include this arm control, and the VLA tasks, in a full conversational experience to be able to ask Reachy for the things I need on my desk!

Stay tuned for more!

## Code

*(Add your repo link or code snippets here.)*
