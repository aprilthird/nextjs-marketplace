import NewsCard from "@/lib/components/cards/news";
import ProductCard from "@/lib/components/cards/product";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import Slider from "@/lib/components/ui/slider/index";
import News from "@/lib/models/news";
import Product from "@/lib/models/product";
import PromotionList from "@/lib/models/promotion-list";
import PromotionService from "@/lib/services/promotion";
import classNames from "classnames";

type Props = {
  className?: string;
  items?: News[];
};

export default function NewsListCsr({ className, items }: Props) {
  return (
    <div className={classNames("", className)}>
      {items?.map((item, i) => (
        <NewsCard key={`news_list_item_${i}`} news={item} />
      ))}
    </div>
  );
}
