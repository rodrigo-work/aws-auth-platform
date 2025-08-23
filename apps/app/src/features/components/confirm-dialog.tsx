import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@repo/design-system/components/ui/alert-dialog'
import { Button } from '@repo/design-system/components/ui/button'
import { cn } from '@repo/design-system/lib/utils'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  desc: React.JSX.Element | string
  handleConfirm: () => void
  type?: 'default' | 'destructive' | 'warning' | 'info'
  cancelBtnText?: string
  confirmText?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

// Mapeia estilos por tipo
const typeClassMap: Record<NonNullable<ConfirmDialogProps['type']>, string> = {
  default: '',
  destructive: 'bg-red-50 border border-red-300',
  warning: 'bg-yellow-50 border border-yellow-300',
  info: 'bg-blue-50 border border-blue-300'
}

// Define o estilo do botão
const typeButtonVariantMap: Record<
  NonNullable<ConfirmDialogProps['type']>,
  'default' | 'destructive' | 'outline'
> = {
  default: 'default',
  destructive: 'destructive',
  warning: 'outline',
  info: 'outline'
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    title,
    desc,
    children,
    className,
    confirmText,
    cancelBtnText,
    isLoading,
    disabled = false,
    handleConfirm,
    type = 'default',
    ...actions
  } = props

  const contentClasses = cn(typeClassMap[type], className)
  const buttonVariant = typeButtonVariantMap[type]

  return (
    <AlertDialog {...actions}>
      <AlertDialogContent className={'contentClasses'}>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{desc}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelBtnText ?? 'Cancelar'}</AlertDialogCancel>
          <Button disabled={disabled || isLoading} onClick={handleConfirm} variant={buttonVariant}>
            {confirmText ?? 'Confirmar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
