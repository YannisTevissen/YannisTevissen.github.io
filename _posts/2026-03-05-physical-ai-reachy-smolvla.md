---
layout: post
title: "My early journey in Physical AI"
date: 2026-03-05 12:00:00
description: Combining a SO-101 arm with Reachy Mini, training SmolVLA on custom teleoperated data, and bringing physical AI to the desk.
tags: [physical-ai, robotics, VLA, Reachy, SmolVLA]
categories: [robotics]
related_posts: false
_styles: |
  .post-video-wrapper { text-align: center; margin: 1.5rem 0; }
  .post-video-wrapper figure { display: inline-block; margin: 0; }
  .post-video-wrapper video,
  .post-video-wrapper iframe { max-height: 70vh; width: auto; height: auto; max-width: 100%; object-fit: contain; }
  .post-video-wrapper.portrait video,
  .post-video-wrapper.portrait iframe { max-height:  min(60vh, 560px); }
  .post-figure-wrapper { text-align: center; margin: 1.5rem 0; }
  .post-figure-wrapper figure { display: inline-block; margin: 0; }
---

Awhile ago, I started growing interest in physical AI: how could the already powerful AI models be used for real physical tasks, and ultimately for better autonomy?

So when it was open sourced, I built a [SO-100](https://github.com/TheRobotStudio/SO-ARM100), then a [SO-101](https://github.com/TheRobotStudio/SO-ARM100). I even mounted the latter to my wheelchair and recorded a nice video.

<div class="post-video-wrapper">
{% include video.liquid path="/assets/video/robot_wheelchair.mp4" controls=true caption="SO-101 arm mounted on my wheelchair." %}
</div>

But like most robotic videos back then, it was carefully recorded and teleoperated to create the illusion of a useful robot. It was not there yet.

A few months later, [Hugging Face](https://huggingface.co) and [Pollen Robotics](https://www.pollen-robotics.com) launched [Reachy Mini](https://www.pollen-robotics.com/products/reachy-mini/), so I bought and built the Lite version. A few months ago, it was ready for some Christmas magic and family demos.

<div class="post-figure-wrapper">
{% include figure.liquid path="/assets/img/P1230385.jpg" alt="Reachy Mini next to the Christmas tree" caption="Reachy Mini Lite, ready for Christmas demos." max-width="400px" %}
</div>

Then, a few weeks ago, I thought: what about combining both robots? The arm needs a front camera to be autonomous on some tasks, and Reachy needs an arm to interact with the world around it.

So after wiring up the two cameras (Reachy's and the one mounted on the arm wrist), the big challenge was the teleoperation.

Due to my disability I cannot use a leader arm, as most teleoperators do. Training in a simulation was also not an option due to my setting, which is particularly difficult (reflective table, complex background, small pen).

So I built a small teleoperation app to directly control the follower SO-101 arm with my phone using two joysticks.

<div class="post-figure-wrapper">
{% include figure.liquid path="/assets/img/teleop.jpeg" alt="Teleoperation app on phone: wrist camera feed and joystick controls for shoulder, elbow, wrist, and gripper" caption="Phone teleoperation interface: wrist camera view and two joysticks for arm control." max-width="400px" %}
</div>

After some warmup trials, I recorded ~50 episodes of the arm picking up a pen and showing it to Reachy.

Then I used these episodes to finetune [SmolVLA](https://huggingface.co/blog/smolvla). I tried LoRA finetuning and full finetuning but I finally got better results with the full finetuning that took about 9 hours on my MacBook Pro M3.

<div class="post-figure-wrapper">
{% include figure.liquid path="/assets/img/robot_training.png" alt="Training loss and gradient norm: full finetuning vs LoRA r=16" caption="Training curves: full finetuning (fft) vs LoRA r=16 — lower loss with full finetuning." %}
</div>

And here was the result!

<div class="post-video-wrapper portrait">
{% include video.liquid path="/assets/video/robots.mp4" controls=true caption="Reachy and SO-101 acting together" %}
</div>

I must say it feels weird to see a model I trained *act* in the real world. Physical AI is really something else and even though I know how it works, it still felt a bit like magic.

Now I can iterate over this prototype and build new use cases using my two robots. I plan to include this arm control, and the VLA tasks, in a full conversational experience to be able to ask Reachy for the things I need on my desk!

Stay tuned for more!

*Code:* https://github.com/YannisTevissen/my-home-bot
