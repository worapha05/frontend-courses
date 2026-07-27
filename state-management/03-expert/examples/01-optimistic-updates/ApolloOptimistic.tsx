import { gql, useMutation } from '@apollo/client';

const UPDATE_TITLE = gql`
  mutation UpdateItemTitle($id: ID!, $title: String!) {
    updateItem(id: $id, title: $title) {
      id
      title
      __typename
    }
  }
`;

type UpdateItemTitleData = {
  updateItem: { id: string; title: string; __typename: 'Item' };
};

/**
 * ตัวอย่างโครงสร้าง optimisticResponse
 * (ต้องมี GraphQL schema จริงถึงจะรัน network ได้ — โฟกัสที่ pattern)
 */
export function RenameItemButton({ id, nextTitle }: { id: string; nextTitle: string }) {
  const [mutate, { loading, error }] = useMutation<UpdateItemTitleData>(UPDATE_TITLE, {
    variables: { id, title: nextTitle },
    optimisticResponse: {
      updateItem: {
        __typename: 'Item',
        id,
        title: nextTitle,
      },
    },
    update(cache, { data }) {
      if (!data?.updateItem) return;
      cache.modify({
        id: cache.identify({ __typename: 'Item', id }),
        fields: {
          title() {
            return data.updateItem.title;
          },
        },
      });
    },
  });

  return (
    <div>
      <button type="button" disabled={loading} onClick={() => void mutate()}>
        เปลี่ยนชื่อแบบ optimistic
      </button>
      {error ? <p>{error.message}</p> : null}
    </div>
  );
}
