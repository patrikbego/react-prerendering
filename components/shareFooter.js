import React from 'react'
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from "react-share";
import styles from "./shareFooter.module.css";

export default function ShareFooter({postData}) {

  return (
    <div className={`${styles.shareMainContainer}`}>
      <div className={`${styles.shareContainer}`}>
        <FacebookShareButton
          url={postData.shareUrl}
          quote={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <FacebookIcon size={32} round/>
        </FacebookShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <FacebookMessengerShareButton
          url={postData.shareUrl}
          appId="521270401588372"
          className={`${styles.shareContainerButton}`}
        >
          <FacebookMessengerIcon size={32} round/>
        </FacebookMessengerShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <TwitterShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <TwitterIcon size={32} round/>
        </TwitterShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <TelegramShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <TelegramIcon size={32} round/>
        </TelegramShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <WhatsappShareButton
          url={postData.shareUrl}
          title={postData.title}
          separator=":: "
          className={`${styles.shareContainerButton}`}
        >
          <WhatsappIcon size={32} round/>
        </WhatsappShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <LinkedinShareButton url={postData.shareUrl} className={`${styles.shareContainerButton}`}>
          <LinkedinIcon size={32} round/>
        </LinkedinShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <PinterestShareButton
          url={postData.shareUrl}
          media={`${postData.imageUrl}`}
          className={`${styles.shareContainerButton}`}
        >
          <PinterestIcon size={32} round/>
        </PinterestShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <VKShareButton
          url={postData.shareUrl}
          image={`${postData.imageUrl}`}
          className={`${styles.shareContainerButton}`}
        >
          <VKIcon size={32} round/>
        </VKShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <OKShareButton
          url={postData.shareUrl}
          image={`${postData.imageUrl}`}
          className={`${styles.shareContainerButton}`}
        >
          <OKIcon size={32} round/>
        </OKShareButton>

      </div>

      <div className={`${styles.shareContainer}`}>
        <RedditShareButton
          url={postData.shareUrl}
          title={postData.title}
          windowWidth={660}
          windowHeight={460}
          className={`${styles.shareContainerButton}`}
        >
          <RedditIcon size={32} round/>
        </RedditShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <TumblrShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <TumblrIcon size={32} round/>
        </TumblrShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <LivejournalShareButton
          url={postData.shareUrl}
          title={postData.title}
          description={postData.shareUrl}
          className={`${styles.shareContainerButton}`}
        >
          <LivejournalIcon size={32} round/>
        </LivejournalShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <MailruShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <MailruIcon size={32} round/>
        </MailruShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <EmailShareButton
          url={postData.shareUrl}
          subject={postData.title}
          body="body"
          className={`${styles.shareContainerButton}`}
        >
          <EmailIcon size={32} round/>
        </EmailShareButton>
      </div>
      <div className={`${styles.shareContainer}`}>
        <ViberShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <ViberIcon size={32} round/>
        </ViberShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <WorkplaceShareButton
          url={postData.shareUrl}
          quote={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <WorkplaceIcon size={32} round/>
        </WorkplaceShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <LineShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <LineIcon size={32} round/>
        </LineShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <WeiboShareButton
          url={postData.shareUrl}
          title={postData.title}
          image={`${postData.imageUrl}`}
          className={`${styles.shareContainerButton}`}
        >
          <WeiboIcon size={32} round/>
        </WeiboShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <PocketShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <PocketIcon size={32} round/>
        </PocketShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <InstapaperShareButton
          url={postData.shareUrl}
          title={postData.title}
          className={`${styles.shareContainerButton}`}
        >
          <InstapaperIcon size={32} round/>
        </InstapaperShareButton>
      </div>

      <div className={`${styles.shareContainer}`}>
        <HatenaShareButton
          url={postData.shareUrl}
          title={postData.title}
          windowWidth={660}
          windowHeight={460}
          className={`${styles.shareContainerButton}`}
        >
          <HatenaIcon size={32} round/>
        </HatenaShareButton>
      </div>
    </div>
  );
}
