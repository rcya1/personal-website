import Head from 'next/head'

type MetaProps = {
  title?: string
  description?: string
}

export default function Meta({
  title = 'Ryan Chang',
  description = 'Personal website for Ryan Chang, an incoming SWE at Jane Street and student at MIT in CS and Math.'
}: MetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
