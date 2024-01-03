export const getServerSideProps = async ({ searchParams }) => {
    console.log(searchParams.get('userId'))
  }
