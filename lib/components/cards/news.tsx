import News from "@/lib/models/news";
import classNames from "classnames";

type Props = {
  className?: string;
  news: News;
};

export default function NewsCard({ className, news }: Props) {
  return (
    <a
      href={news.link}
      className={classNames(
        "rounded shadow-md p-2 flex items-center group bg-white mb-4",
        className
      )}
    >
      <img
        src={news.fullImageUrl}
        className="rounded-2xl object-cover mr-3 h-24 w-24"
      />
      <div className="flex-1">
        <h2 className="font-bold text-lg leading-tight group-hover:underline mb-2">
          {news.title}
        </h2>
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="clock"
            className="h-3 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
            ></path>
          </svg>
          <span className="text-xs">{news.createDate}</span>
        </div>
      </div>
    </a>
  );
}
