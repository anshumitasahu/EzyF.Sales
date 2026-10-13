import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

const maxFileSize = 10485760;

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Invalid filetype, Onl iamge files are allowed!'))
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }
})