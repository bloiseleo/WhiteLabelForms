interface ErrorViewProps {
  errors?: {[key: string]: boolean}
  errorsMessages: {[key: string]: string}
}

export function ErrorView({errors, errorsMessages}: ErrorViewProps) {
  const errorsToBeTreated = errors ?? {}; 
  const keys = Object.keys(errorsToBeTreated);
  const errorsTrue = keys.filter(k => errorsToBeTreated[k]);
  const hasErrors = () =>  keys.length > 0 && errorsTrue.length > 0; 
  return <>
    {hasErrors() ? 
      <p className="mt-[-8px] text-sm text-danger">
        {errorsMessages[errorsTrue[0] as string]}
      </p>: <></>
    }
  </>  
}