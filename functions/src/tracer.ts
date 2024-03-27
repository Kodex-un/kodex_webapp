const { NodeSDK } = require("@opentelemetry/sdk-node");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const {
  TraceExporter,
} = require("@google-cloud/opentelemetry-cloud-trace-exporter");
import { ClientRequest } from "http";
import { Span } from "@opentelemetry/sdk-trace-node";

const provider = new NodeTracerProvider();
const exporter = new TraceExporter();
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register();

interface ClientRequestWithId extends ClientRequest {
  rid: string;
}

const sdk = new NodeSDK({
  spanProcessors: [new BatchSpanProcessor(exporter)],
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-http": {
        applyCustomAttributesOnSpan: (
          span: Span,
          request: ClientRequestWithId,
        ) => {
          span.setAttribute("rid", request.rid);
        },
      },
    }),
  ],
});
sdk.start();

export default opentelemetry.trace.getTracer("basic");
