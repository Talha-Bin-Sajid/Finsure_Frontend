import React, { useState, useRef, useEffect } from "react";
import {
  Upload as UploadIcon,
  File,
  X,
  CheckCircle,
  Loader,
  Eye,
  EyeOff,
  Landmark,
} from "lucide-react";
import { uploadApi, banksApi, Bank } from "../services/apiClient";
import { toast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  // Per-file bank slug ("meezan", "easypaisa", ...) -- drives the BE parser
  // choice and whether a password is required.
  const [fileBanks, setFileBanks] = useState<{ [key: string]: string }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePasswords, setFilePasswords] = useState<{ [key: string]: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [banks, setBanks] = useState<Bank[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    banksApi.getAll().then(setBanks).catch(() => setBanks([]));
  }, []);

  const bankBySlug = (slug: string) => banks.find((b) => b.slug === slug);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      ["application/pdf", "image/jpeg", "image/png", "image/heic"].includes(
        file.type
      )
    );
    if (droppedFiles.length > 0) {
      setFiles([...files, ...droppedFiles]);
      toast.success(`${droppedFiles.length} file(s) added`);
    } else {
      toast.error("Please upload PDF, JPG, PNG, or HEIC files only");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
      toast.success(`${selectedFiles.length} file(s) added`);
    }
  };

  const removeFile = (index: number) => {
    const fileName = files[index].name;

    setFiles(files.filter((_, i) => i !== index));

    const newFileBanks = { ...fileBanks };
    delete newFileBanks[fileName];
    setFileBanks(newFileBanks);

    const newPasswords = { ...filePasswords };
    delete newPasswords[fileName];
    setFilePasswords(newPasswords);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    const missingBanks = files.filter((file) => !fileBanks[file.name]);
    if (missingBanks.length > 0) {
      toast.error("Please choose a bank for every file");
      return;
    }

    const missingPasswords = files.filter((file) => {
      const bank = bankBySlug(fileBanks[file.name]);
      return bank?.requiresPassword && !filePasswords[file.name];
    });

    if (missingPasswords.length > 0) {
      toast.error(
        "A statement password is required for the selected bank(s)"
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const bank = bankBySlug(fileBanks[files[i].name]);
        if (!bank) continue; // guarded by missingBanks check above
        await uploadApi.uploadStatement(
          files[i],
          { slug: bank.slug, isMobileWallet: bank.isMobileWallet },
          bank.requiresPassword ? filePasswords[files[i].name] : null
        );

        setUploadProgress(((i + 1) / files.length) * 100);
      }

      toast.success("Files uploaded successfully");

      setTimeout(() => {
        navigate("/history");
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to upload files");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Upload Documents
        </h1>
        <p className="text-[var(--text-secondary)]">
          Upload your receipts, invoices, or bank statements for automatic data
          extraction
        </p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="bg-[var(--bg-secondary)] border-2 border-dashed border-[#14e7ff]/40 rounded-lg p-12 text-center hover:border-[#14e7ff] transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon className="mx-auto text-[#14e7ff] mb-4" size={48} />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-[var(--text-secondary)]">
          Supported formats: PDF, JPG, PNG, HEIC (Max 10MB per file)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.heic"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {banks.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-medium">
            <Landmark className="w-4 h-4 text-[#14e7ff]" />
            Supported banks:
          </span>
          {banks.map((b) => (
            <span
              key={b.id}
              className="px-2.5 py-1 rounded-full bg-[#14e7ff]/10 border border-[#14e7ff]/30 text-[#14e7ff] text-xs font-medium"
            >
              {b.name}
            </span>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
            Selected Files ({files.length})
          </h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-[var(--bg-primary)] rounded-lg"
              >
                <File className="text-[#14e7ff] flex-shrink-0" size={24} />
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--text-primary)] font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <select
                  value={fileBanks[file.name] || ""}
                  onChange={(e) =>
                    setFileBanks({ ...fileBanks, [file.name]: e.target.value })
                  }
                  className="bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-3 py-2 focus:border-[#14e7ff] focus:outline-none"
                  disabled={isUploading}
                >
                  <option value="">Select bank</option>
                  {banks.map((b) => (
                    <option key={b.id} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                </select>
                {bankBySlug(fileBanks[file.name])?.requiresPassword && (
                  <div className="relative w-56">
                    <input
                      type={showPassword[file.name] ? "text" : "password"}
                      placeholder="Statement password"
                      value={filePasswords[file.name] || ""}
                      onChange={(e) =>
                        setFilePasswords({
                          ...filePasswords,
                          [file.name]: e.target.value,
                        })
                      }
                      disabled={isUploading}
                      className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded px-3 py-2 pr-10 focus:border-[#14e7ff] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          [file.name]: !showPassword[file.name],
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[#14e7ff]"
                    >
                      {showPassword[file.name] ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                )}

                {!isUploading && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--text-primary)] text-sm">
                  Uploading...
                </span>
                <span className="text-[#14e7ff] text-sm font-medium">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="w-full bg-[var(--bg-primary)] rounded-full h-2">
                <div
                  className="bg-[#14e7ff] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[var(--text-primary)] opacity-80">
                <Loader className="animate-spin" size={20} />
                <span>Processing files with OCR...</span>
              </div>
            </div>
          )}

          {!isUploading && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleUpload}
                className="flex-1 bg-[#0ab6ff] hover:bg-[#14e7ff] text-[#0c111a] py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                <span>Upload & Process</span>
              </button>
              <button
                onClick={() => {
                  setFiles([]);
                  setFileBanks({});
                  setFilePasswords({});
                }}
                className="px-6 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] py-3 rounded-lg font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
