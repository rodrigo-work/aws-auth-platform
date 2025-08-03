import { Button } from '@repo/design-system/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@repo/design-system/components/ui/card'
import { PlusIcon } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'
import PageContainer from '@/components/layout/page-container'
import { searchParamsCache } from '@/lib/searchparams'

export const metadata = {
  title: 'Dashboard: Home',
  description: 'Home page of the repo'
}

type pageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={true}>
      <div className="mx-auto max-w-6xl">
        <ApiKeysCard />
        {/* <ApiKeysSection /> */}
      </div>
    </PageContainer>
  )
}
function ApiKeysCard() {
  return (
    <div className="flex flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
      {/* Título geral */}
      <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col gap-1">
          <CardTitle className="text-lg text-zinc-800 leading-7 dark:text-white">
            API keys
          </CardTitle>
          <CardDescription className="text-sm text-zinc-950/50 dark:text-white/50">
            Used to authenticate your application when interacting with the API.
          </CardDescription>
        </div>
      </div>

      {/* Assistant API Keys Section – dentro de Card */}
      <Card className="grid grid-cols-1 gap-x-12-- gap-y-4 py-8-- sm:grid-cols-8">
        <CardHeader className="col-span-3 flex flex-col gap-1">
          <CardTitle className="text-zinc-950/90 dark:text-white/90">Assistant API keys</CardTitle>
          <CardDescription className="text-sm text-zinc-950/50 dark:text-white/50">
            Create public API keys for the assistant API
          </CardDescription>
        </CardHeader>
        <CardContent className="col-span-5 flex flex-col gap-8">
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <p className="text-sm text-zinc-950 dark:text-white">Active assistant keys</p>
              <p className="text-sm text-zinc-950/50 dark:text-white/50">
                Please ensure to copy your API keys once generated as you may not be able to see
                them again.
              </p>
            </div>
            <Button className="inline-flex h-9 items-center justify-center gap-0.5 rounded-[10px] bg-zinc-950/90 px-2 text-sm text-white/90 hover:bg-zinc-950/80 dark:bg-white dark:text-zinc-950 dark:hover:bg-white/90">
              <PlusIcon className="h-4 w-4" />
              <span className="px-1">Create Assistant API Key</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example Page Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Custom domain setup</CardTitle>
          <CardDescription>Host the docs at your own domain</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-12 gap-y-4 py-8 sm:grid-cols-8">
          <div className="col-span-3 flex flex-col gap-1">
            <CardTitle className="text-zinc-950/90 dark:text-white/90">
              Set up your domain
            </CardTitle>
            <CardDescription className="text-sm text-zinc-950/50 dark:text-white/50">
              This domain will be assigned to your Production Deployment
            </CardDescription>
          </div>
          <div className="col-span-5 flex flex-col gap-6">
            {/* Domain input and controls */}
            <div className="flex flex-col gap-4 pb-0 md:flex-row md:items-start">
              <div className="flex flex-1 flex-col gap-1">
                <CardTitle>Enter your domain URL</CardTitle>
                <CardDescription>
                  You can host your domain as a subdomain or a subdirectory
                </CardDescription>
              </div>
              {/* Toggle and URL input action area */}
              {/* ...similar structure using Shadcn components or styled buttons/... */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// export function ApiKeysSection() {
//   return (
//     <div className="flex flex-col divide-y divide-zinc-950/5 pb-24 dark:divide-white/5">
//       {/* Section Header */}
//       <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center">
//         <div className="flex flex-1 flex-col gap-1">
//           <h2 className="mr-2 inline-block font-medium text-lg text-zinc-800 leading-7 dark:text-white">
//             API keys
//           </h2>
//           <span className="text-sm text-zinc-950/50 dark:text-white/50">
//             Used to authenticate your application when interacting with the API.
//           </span>
//         </div>
//       </div>

//       {/* Project ID */}
//       <Card className="grid grid-cols-1 gap-x-12 gap-y-4 py-8 sm:grid-cols-8">
//         <CardHeader className="col-span-3">
//           <CardTitle>Project ID</CardTitle>
//           <CardDescription>Your unique application identifier</CardDescription>
//         </CardHeader>
//         <CardContent className="col-span-5">
//           <div className="flex items-center gap-2">
//             <Input className="flex-1" id="project-id" readOnly value="6887c14845a2ea87cb5942a3" />
//             <Button size="icon" variant="ghost">
//               <Copy className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Admin API Keys */}
//       <Card className="grid grid-cols-1 gap-x-12 gap-y-4 py-8 sm:grid-cols-8">
//         <CardHeader className="col-span-3">
//           <CardTitle>Admin API keys</CardTitle>
//           <CardDescription>
//             Learn more about how to use the API in our{' '}
//             <a
//               className="border-zinc-950/5 border-b hover:border-zinc-950/10 dark:border-white/5 dark:hover:border-white/10"
//               href="https://mintlify.com/docs/api-reference/introduction"
//               rel="noopener noreferrer"
//               target="_blank"
//             >
//               docs
//             </a>
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="col-span-5 space-y-8">
//           <div className="space-y-3.5">
//             <div className="space-y-1.5">
//               <p className="flex items-center gap-2 text-sm text-zinc-950 dark:text-white">
//                 Active admin keys
//               </p>
//               <p className="text-sm text-zinc-950/50 dark:text-white/50">
//                 Please ensure to copy your API keys once generated as you may not be able to see
//                 them again.
//               </p>
//             </div>
//             <Button className="gap-0.5">
//               <Plus className="h-4 w-4" />
//               <span className="px-1">Create Admin API Key</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Assistant API Keys */}
//       <Card className="grid grid-cols-1 gap-x-12 gap-y-4 py-8 sm:grid-cols-8">
//         <CardHeader className="col-span-3">
//           <CardTitle>Assistant API keys</CardTitle>
//           <CardDescription>Create public API keys for the assistant API</CardDescription>
//         </CardHeader>
//         <CardContent className="col-span-5 space-y-8">
//           <div className="space-y-3.5">
//             <div className="space-y-1.5">
//               <p className="flex items-center gap-2 text-sm text-zinc-950 dark:text-white">
//                 Active assistant keys
//               </p>
//               <p className="text-sm text-zinc-950/50 dark:text-white/50">
//                 Please ensure to copy your API keys once generated as you may not be able to see
//                 them again.
//               </p>
//             </div>
//             <Button className="gap-0.5">
//               <Plus className="h-4 w-4" />
//               <span className="px-1">Create Assistant API Key</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
