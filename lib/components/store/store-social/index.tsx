"use client";

import User from "@/lib/models/user";
import FacebookIcon from "../../ui/icons/social/facebook";
import TikTokIcon from "../../ui/icons/social/tiktok";
import WhatsAppIcon from "../../ui/icons/social/whatsapp";
import InstagramIcon from "../../ui/icons/social/instagram";
import { WebSVGIcon } from "@react-md/material-icons";

type Props = {
  user: User;
};

const StoreSocial = ({ user }: Props) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <a target="_blank" href={user.website}>
        <WebSVGIcon className="h-8 w-8" />
      </a>
      <a target="_blank" href={user.facebook}>
        <FacebookIcon className="h-8 w-8" />
      </a>
      <a target="_blank" href={user.instagram}>
        <InstagramIcon className="h-8 w-8" />
      </a>
      <a target="_blank" href={user.whatsapp}>
        <WhatsAppIcon className="h-8 w-8" />
      </a>
      <a target="_blank" href={user.tiktok}>
        <TikTokIcon className="h-8 w-8" />
      </a>
      {user.website && (
        <a target="_blank" href={user.website}>
          <WebSVGIcon />
        </a>
      )}
    </div>
  );
};

export default StoreSocial;
