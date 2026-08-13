type KonfHubWidgetProps = {
  src: string;
  className?: string;
};

export default function KonfHubWidget({ src, className }: KonfHubWidgetProps) {
  return (
    <iframe
      className={className}
      src={src}
      id="konfhub-widget"
      title="Register for Flutter South India"
      width="100%"
      height="720"
      allow="payment"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
