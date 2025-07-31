from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from opentelemetry.instrumentation.django import DjangoInstrumentor

# Set up OpenTelemetry tracing
provider = TracerProvider()
trace.set_tracer_provider(provider)
span_processor = BatchSpanProcessor(ConsoleSpanExporter())
provider.add_span_processor(span_processor)

# Instrument Django
DjangoInstrumentor().instrument()
