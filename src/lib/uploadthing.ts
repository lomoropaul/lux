import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const isAdmin = await isAdminAuthenticated();
      if (!isAdmin) throw new Error("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
  heroImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const isAdmin = await isAdminAuthenticated();
      if (!isAdmin) throw new Error("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
