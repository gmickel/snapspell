# 🪄 SnapSpell: Instant AI Image Sorcery with Flux 1.1 Pro! 🖼️

Welcome to SnapSpell, where your words transform into visual magic faster than you can say "Abracadabra"! 🚀

https://github.com/user-attachments/assets/c7f6068b-f5a3-49d7-8f96-a50995fd5fb2

## 🌟 What's This Wizardry?

SnapSpell is your personal AI-powered image conjurer. Just type in a description, and watch as it materializes images like a digital sorcerer! Whether you're seeking inspiration, crafting content, or just curious about what "flying pizza in a steampunk universe" looks like, we've got the spell for you!

## 🚀 Features That'll Leave You Spellbound

- 🖌️ **Real-time Conjuring**: Start typing, and we start creating. It's like your words are magic wands!
- 🖼️ **Multiple Aspect Ratios**: Square, portrait, landscape - all the magical shapes your heart desires.
- 🔄 **Re-cast Spells**: Not quite the enchantment you wanted? Cast again with a click!
- 💾 **Easy Enchantment Saving**: Love what you've conjured? Save it instantly!
- ⚡ **Two Powerful Models**:
  - 🌟 **Flux 1.1 Pro**: Our latest and greatest! Lightning-fast generation with improved quality.
  - 🔮 **Flux 1.0 Schnell**: The reliable classic. Great for unlimited creativity!
  - 🧙‍♂️ **Flux 1.0 Schnell Free**: The free version of Flux 1.0 Schnell. (Rate limited to 6 queries per minute)
- 🎛️ **Customizable Incantations**: Adjust your spell components to your heart's content!
- 🚦 **Optional Rate Limiting**: Implement magical boundaries to ensure fair usage for all sorcerers.

## 🛠️ Setting Up Your Magical Workshop (It's a Breeze!)

1. **Summon the repository:**

   ```
   git clone https://github.com/gmickel/snapspell.git
   cd snapspell
   ```

2. **Gather your magical dependencies:**

   ```
   pnpm install
   ```

3. **Prepare your magical environment:**

   - Duplicate `.env.template` and rename it to `.env` or `.env.local`
   - Fill in your arcane details (we'll guide you through the ritual)

4. **Set up Together AI for image generation:**

   - Sign up for an account at [Together AI](https://www.together.ai/)
   - Navigate to your account settings or API section
   - Generate a new API key
   - Copy the API key and add it to your `.env` file as `TOGETHER_API_KEY`

5. **[Optional] Set up Upstash for rate limiting:**

   If you want to implement rate limiting:

   - Sign up for a free account at [Upstash](https://upstash.com/)
   - Create a new Redis database
   - In your database details, find the "REST API" section
   - Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
   - Add these values to your `.env` file
   - Set `ENABLE_RATE_LIMIT=true` in your `.env` file

6. **Ignite your development crystal ball:**

   ```
   pnpm dev
   ```

7. **Open your scrying mirror (browser) and navigate to `http://localhost:3000`**

8. **Begin conjuring amazing images!**

## 🔑 Arcane Variables (The Secret Ingredients)

- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: For our mystical rate limiting. Obtain these from the Upstash sanctuary.
- `TOGETHER_API_KEY`: The key to our AI realm. Acquire one from the Together AI guild.
- `BYPASS_IPS`: Comma-separated list of IPs that receive unrestricted casting abilities.
- `ENABLE_RATE_LIMIT`: Set to 'true' to activate rate limiting, 'false' to disable it.
- Various `NEXT_PUBLIC_*` variables: Customize your magical domain's appearance!

## 🚦 Spell Rationing (Ensuring Magical Harmony)

SnapSpell now comes with an optional rate limiting feature to maintain balance in the magical realm. Here's how it works:

- Set `ENABLE_RATE_LIMIT=true` in your `.env` file to activate rate limiting.
- When enabled, Flux 1.1 Pro and Flux 1.0 Schnell users are granted a limited number of powerful conjurations per day (configurable in `config.ts`).
- Flux 1.0 Schnell Fremains available for unlimited practice, even with rate limiting enabled.
- Add specific IP addresses to the `BYPASS_IPS` variable to grant them unlimited access.
- For personal use or development, you can set `ENABLE_RATE_LIMIT=false` to remove all restrictions.

Adjust the rate limits in `config.ts` to suit your needs.

## 🧙‍♂️ Magical Stack (Our Sorcerer's Toolkit)

SnapSpell harnesses the power of these mystical artifacts:

- 🌪️ **Next.js 14**: Our enchanted foundation, providing the swiftest of spells for server-side rendering and magical routing.
- 🎨 **Together AI**: The arcane engine behind our image conjuring, turning words into visual wonders.
- 🔮 **shadcn/ui**: A treasure trove of pre-crafted UI components, allowing us to weave beautiful interfaces with ease.
- ⚡ **Upstash**: Our ethereal vault for rate limiting, ensuring fair usage of magical resources across the realm.
- 🌌 **FLUX Models by Black Forest Labs**: The mystical core of our image generation, crafting visual spells with unparalleled speed and quality.
  - 🚀 **Flux 1.1 Pro**: Our most advanced conjuring engine, delivering swift and stunning results.
  - 🌟 **Flux 1.0 Schnell**: The reliable classic, perfect for unlimited creative exploration.

These powerful tools combine to create a seamless, responsive, and enchanting experience for all who dare to wield SnapSpell's power!

## 🤝 Join Our Coven of Contributors

Got enchanting ideas? We love magical innovations! Consult our `CONTRIBUTING.md` scroll and let's weave some digital sorcery together!

## 💖 Support Our Magical Endeavors

If SnapSpell has enchanted you (and we're sure it will), consider offering a potion of gratitude or, perhaps, a new crystal ball. Check our `FUNDING.yml` for ways to support our magical research!

## 📜 Magical License

This project is protected by the MIT License - see the LICENSE scroll for details. In other words, spread the magic, but remember to credit the original spellcasters!

---

Now go forth and create some AI masterpieces! Remember, even Merlin had to start somewhere! 🎨✨
