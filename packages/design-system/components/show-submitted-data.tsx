import { toast } from 'sonner'

export function showSubmittedData(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: unknown | any,
  title = 'You submitted the following values:'
) {
  if (data?.error) {
    toast.error(<span className="w-full text-red-500">{data.title}</span>, {
      description: <span className="w-full text-red-500">{data.error}</span>,
      classNames: {
        title: 'text-red-500',
        description: 'text-normal',
        icon: 'text-red-500'
      },
      closeButton: false,
      dismissible: true
      // action: {
      //   label: 'Undo',
      //   onClick: () => alert('Undo')
      // }
    })
    return
  }

  if (data.success) {
    toast.success(<span className="w-full text-green-500">{data.title}</span>, {
      description: <span className="w-full text-green-500">{data.success}</span>,
      classNames: {
        title: 'text-green-500',
        description: 'text-normal',
        icon: 'text-green-500'
      }
      // action: {
      //   label: 'Undo',
      //   onClick: () => alert('Undo')
      // }
    })
    return
  }

  toast.message(title, {
    description: (
      // w-[340px]
      // w-full
      <pre className="mt-2 w-[340px] overflow-x-auto overflow-y-scroll rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    )
  })
}
