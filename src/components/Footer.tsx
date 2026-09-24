import { FaInstagram, FaTiktok } from "react-icons/fa";
import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="font-medium text-white">{profile.name}</p>
          <p className="text-sm text-white/50">UGC Creator</p>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <FaInstagram /> {profile.instagram}
          </a>
          <a
            href={profile.tiktokUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <FaTiktok /> {profile.tiktok}
          </a>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="text-sm hover:text-white transition-colors"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
