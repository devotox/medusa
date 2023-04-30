import React, { ErrorInfo } from "react"
import Button from "../../fundamentals/button"
import RefreshIcon from "../../fundamentals/icons/refresh-icon"
import WarningCircleIcon from "../../fundamentals/icons/warning-circle"
import XCircleIcon from "../../fundamentals/icons/x-circle-icon"

type WidgetInfo = {
  name: string
  origin: string
}

type Props = {
  type: "widget" | "page"
  children: React.ReactNode
  info: WidgetInfo
}

type State = {
  hasError: boolean
  hidden?: boolean
}

class ExtensionErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, hidden: false }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.group(
        `%cAn error occurred in the widget ${this.props.info.name} from ${this.props.info.origin}:`,
        "color: red; font-weight: bold, background-color: #fff;"
      )
      console.error(error)
      console.error(
        "%cComponent Stack:",
        "color: red",
        errorInfo.componentStack
      )
      console.groupEnd()
    }
  }

  public handleResetError() {
    this.setState({ hasError: false })
  }

  public hideError() {
    this.setState({ hidden: true })
  }

  public renderFallback() {
    if (process.env.NODE_ENV !== "production" && !this.state.hidden) {
      switch (this.props.type) {
        case "page":
          return <FallbackPage info={this.props.info} />
        case "widget":
          return (
            <FallbackWidget
              info={this.props.info}
              reset={this.handleResetError.bind(this)}
              hide={this.hideError.bind(this)}
            />
          )
      }
    }

    // Don't render anything in production
    return null
  }

  render() {
    if (this.state.hasError) {
      return this.renderFallback()
    }

    return this.props.children
  }
}

const FallbackWidget = ({
  info,
  reset,
  hide,
}: {
  info: WidgetInfo
  reset: () => void
  hide: () => void
}) => {
  return (
    <div className="rounded-rounded p-base bg-rose-10 border-rose-40 gap-x-small flex justify-start border">
      <div>
        <WarningCircleIcon
          size={20}
          fillType="solid"
          className="text-rose-40"
        />
      </div>
      <div className="text-rose-40 inter-small-regular w-full pr-[20px]">
        <h1 className="inter-base-semibold mb-2xsmall">Uncaught error</h1>
        <p className="mb-small">
          The widget <strong>{info.name}</strong> from{" "}
          <strong>{info.origin}</strong> crashed. See the console for more info.
        </p>
        <p className="mb-large">
          <strong>What should I do?</strong>
          <br />
          If you are the developer of this widget, you should fix the error and
          reload the page. If you are not the developer, you should contact the
          maintainer and report the error.
        </p>
        <div className="gap-x-base flex items-center">
          <Button
            variant="nuclear"
            size="small"
            type="button"
            onClick={hide}
            className="w-full"
          >
            <div className="flex items-center">
              <XCircleIcon size="20" />
              <span className="ml-xsmall">Hide</span>
            </div>
          </Button>
          <Button
            variant="nuclear"
            size="small"
            type="button"
            onClick={reset}
            className="w-full"
          >
            <div className="flex items-center">
              <RefreshIcon size="20" />
              <span className="ml-xsmall">Reload</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

const FallbackPage = ({ info }: { info: WidgetInfo }) => {
  return <div>Not implemented</div>
}

export default ExtensionErrorBoundary