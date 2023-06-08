import { SchemaObject } from "@/types/openapi"
import TagOperationParametersDefault from "../Default"
import dynamic from "next/dynamic"
import Loading from "@/app/loading"

const TagOperationParametersProperties = dynamic(() => import("../Properties"), {
  loading: () => <Loading />
})

type TagOperationParametersArrayProps = {
  name: string
  schema: SchemaObject
  is_required?: boolean
}

const TagOperationParametersArray = ({
  name, schema, is_required
}: TagOperationParametersArrayProps) => {
  if (schema.type !== "array") {
    return <></>
  }

  return (
    <>
      {schema.items.type === "object" && (
        <details>
          <summary>
            <TagOperationParametersDefault
              name={name}
              schema={schema}
              is_required={is_required}
            />
          </summary>
    
          <TagOperationParametersProperties schema={schema.items} />
      </details>
      )}
      {schema.items.type !== "object" && (
        <TagOperationParametersDefault
          name={name}
          schema={schema}
          is_required={is_required}
        />
      )}
    </>
  )
}

export default TagOperationParametersArray