import { CallbackModule } from '@/modules/CallbackModule';

export default async function Callback({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  return <CallbackModule code={searchParams.code} />;
}
