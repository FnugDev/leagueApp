
import million from "million/compiler"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['ddragon.leagueoflegends.com', 'raw.communitydragon.org', 'static.bigbrain.gg'],
  },
};
const millionConfig = {
  auto: false,
  // if you're using RSC:
  // auto: { rsc: true },
}
 
export default million.next(nextConfig, millionConfig);