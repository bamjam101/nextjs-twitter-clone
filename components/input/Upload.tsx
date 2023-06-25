interface UploadProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
}

const Upload: React.FC<UploadProps> = ({
  value,
  label,
  disabled,
  onChange,
}) => {
  return <div>Upload</div>;
};

export default Upload;
