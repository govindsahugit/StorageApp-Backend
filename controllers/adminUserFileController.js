import { validateDirectory } from "../utils/directoryUtils.js";
import {
  fetchFile,
  fileValidate,
  removeFile,
  renamefile,
  uploadFile,
} from "../utils/fileUtils.js";

export const readUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { file } = await fileValidate(res, id);
    const response = await fetchFile(req, res, id, file);
    return response;
  } catch (error) {
    next(error);
  }
};

export const uploadUserFile = async (req, res, next) => {
  const filename = req.headers.filename || "untitled";
  const parentDirId = req.params.parentDirId;
  const filesize = +req.headers.filesize;
  try {
    const { directory: parentDir } = await validateDirectory(res, parentDirId);

    const response = await uploadFile(
      req,
      res,
      parentDir.userId,
      filename,
      filesize,
      parentDirId,
      parentDir
    );

    return response;
  } catch (error) {
    next(error);
  }
};

export const deleteUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { file } = await fileValidate(res, id);
    const response = await removeFile(res, id, file);
    return response;
  } catch (error) {
    next(error);
  }
};

export const renameUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    await fileValidate(res, id);
    const response = await renamefile(req, res, id);
    return response;
  } catch (error) {
    next(error);
  }
};
