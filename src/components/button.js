/** @jsx jsx */
import { jsx, Button, Spinner, Box } from "theme-ui"

const LoadingSpinner = () => (
  <Spinner variant="styles.loadingSpinner" size="24px" />
)

export default function (props) {
  return (
    <Button {...props}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {props.loading ? <LoadingSpinner /> : props.children}
      </Box>
    </Button>
  )
}
