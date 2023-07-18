import type { CodeBlockProps } from "@/components/CodeBlock"
import CodeTabs from "@/components/CodeTabs"
import Loading from "@/components/Loading"
import type { ExampleObject, ResponseObject } from "@/types/openapi"
import type { JSONSchema7 } from "json-schema"
import stringify from "json-stringify-pretty-compact"
import dynamic from "next/dynamic"
import { sample } from "openapi-sampler"
import { useEffect, useState } from "react"

const CodeBlock = dynamic<CodeBlockProps>(
  async () => import("../../../../../CodeBlock"),
  {
    loading: () => <Loading />,
  }
) as React.FC<CodeBlockProps>

export type TagsOperationCodeSectionResponsesSampleProps = {
  response: ResponseObject
} & React.AllHTMLAttributes<HTMLDivElement>

const TagsOperationCodeSectionResponsesSample = ({
  response,
  className,
}: TagsOperationCodeSectionResponsesSampleProps) => {
  const [examples, setExamples] = useState<ExampleObject[]>([])
  const [selectedExample, setSelectedExample] = useState<
    ExampleObject | undefined
  >()
  const lang = response.content
    ? getLanguageFromMedia(Object.keys(response.content)[0])
    : ""

  const initExamples = () => {
    if (!response.content) {
      return []
    }
    const contentSchema = Object.values(response.content)[0]
    const tempExamples = []
    if (contentSchema.examples) {
      Object.entries(contentSchema.examples).forEach(([value, example]) => {
        if ("$ref" in example) {
          return []
        }

        tempExamples.push({
          title: example.summary || "",
          value,
          content: stringify(example.value, {
            maxLength: 50,
          }),
          contentSchema: stringify(contentSchema.schema, {
            maxLength: 50,
          }),
        })
      })
    } else if (contentSchema.example) {
      tempExamples.push({
        title: "",
        value: "",
        content: stringify(contentSchema.example, {
          maxLength: 50,
        }),
        contentSchema: stringify(contentSchema.schema, {
          maxLength: 50,
        }),
      })
    } else {
      const contentSample = stringify(
        sample(
          {
            ...contentSchema.schema,
          } as JSONSchema7,
          {
            skipNonRequired: true,
          }
        ),
        {
          maxLength: 50,
        }
      )

      let contentSampleDetailed = stringify(
        sample({
          ...contentSchema.schema,
        } as JSONSchema7),
        {
          maxLength: 50,
        }
      )

      if (contentSample === contentSampleDetailed) {
        contentSampleDetailed = ""
      }

      tempExamples.push({
        title: "",
        value: "",
        content: contentSample,
        contentDetailed: contentSampleDetailed,
        contentSchema: stringify(contentSchema.schema, {
          maxLength: 50,
        }),
      })
    }

    return tempExamples
  }

  useEffect(() => {
    const tempExamples = initExamples()
    setExamples(tempExamples)
    setSelectedExample(tempExamples[0])
  }, [])

  return (
    <>
      <div className={className}>
        {response.content && (
          <fieldset className="border-medusa-border-base dark:border-medusa-border-base-dark rounded border p-0.5">
            <legend>Content type</legend>
            <span>{Object.keys(response.content)[0]}</span>
          </fieldset>
        )}
        <div>
          {examples.length > 1 && (
            <select
              onChange={(event) =>
                setSelectedExample(
                  examples.find((ex) => ex.value === event.target.value)
                )
              }
              className="border-medusa-border-base dark:border-medusa-border-base-dark my-1 w-full rounded border p-0.5"
            >
              {examples.map((example, index) => (
                <option value={example.value} key={index}>
                  {example.title}
                </option>
              ))}
            </select>
          )}
          {/* {selectedExample?.contentDetailed && (
            <CodeTabs
              tabs={[
                {
                  label: "Minimal Response",
                  value: "minimal",
                  code: {
                    source: selectedExample.content,
                    lang: lang,
                    preClassName: "max-h-[400px]",
                  },
                },
                {
                  label: "Detailed Response",
                  value: "detailed",
                  code: {
                    source: selectedExample.contentDetailed,
                    lang: lang,
                    preClassName: "max-h-[400px]",
                  },
                },
              ]}
              className="mt-1"
            />
          )}
          {selectedExample && !selectedExample.contentDetailed && (
            <CodeBlock
              source={selectedExample.content}
              lang={getLanguageFromMedia(Object.keys(response.content)[0])}
              preClassName="max-h-[400px]"
            />
          )} */}
          {selectedExample?.contentSchema && (
            <CodeTabs
              tabs={[
                {
                  label: "Example Response",
                  value: "example",
                  code: {
                    source: selectedExample.content,
                    lang: lang,
                    className: "max-h-[400px]",
                  },
                },
                {
                  label: "Response Schema",
                  value: "schema",
                  code: {
                    source: selectedExample.contentSchema,
                    lang: lang,
                    className: "max-h-[400px]",
                  },
                },
              ]}
              className="mt-1"
            />
          )}
          {selectedExample && !selectedExample.contentSchema && (
            <CodeBlock
              source={selectedExample.content}
              lang={getLanguageFromMedia(Object.keys(response.content)[0])}
              className="max-h-[400px]"
            />
          )}
          {!selectedExample && <>Empty Response</>}
        </div>
      </div>
    </>
  )
}

export default TagsOperationCodeSectionResponsesSample

const getLanguageFromMedia = (media: string) => {
  return media.substring(media.indexOf("/"))
}
