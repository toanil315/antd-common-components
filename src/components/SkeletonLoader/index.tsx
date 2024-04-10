import { Primary, Secondary, Skeleton } from './SkeletonLoader';

interface SkeleTonLoaderInterface {
  Wrapper: typeof Skeleton;
  Primary: typeof Primary;
  Secondary: typeof Secondary;
}

const SkeletonLoader = {} as SkeleTonLoaderInterface;
SkeletonLoader.Wrapper = Skeleton;
SkeletonLoader.Primary = Primary;
SkeletonLoader.Secondary = Secondary;
export default SkeletonLoader;
