import { Skeleton, SkeletonRow } from '@adobe/elsie/components';
export const ResetPasswordSkeleton = () => {
    return (<Skeleton>
      <SkeletonRow variant="heading" size="xlarge" fullWidth={false} lines={1}/>
      <SkeletonRow variant="heading" size="xlarge" fullWidth={true} lines={1}/>
      <SkeletonRow variant="heading" size="xlarge" fullWidth={true} lines={1}/>
      <SkeletonRow variant="heading" size="medium" fullWidth={false} lines={1}/>{' '}
      <SkeletonRow variant="heading" size="medium" fullWidth={false} lines={1}/>
    </Skeleton>);
};
