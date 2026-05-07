import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "김민수 | IT Engineer · Full Stack Developer",
  description: "SCADA, IoT, 웹 백엔드, 엣지컴퓨팅까지 — 10년 이상의 실전 경험을 가진 풀스택 개발자 김민수의 포트폴리오입니다.",
  keywords: ["풀스택 개발자", "IoT", "Node.js", "SCADA", "엣지컴퓨팅", "백엔드 개발자", "포트폴리오"],
  authors: [{ name: "김민수" }],
  openGraph: {
    title: "김민수 | IT Engineer · Full Stack Developer",
    description: "SCADA, IoT, 웹 백엔드, 엣지컴퓨팅까지 — 10년 이상의 실전 경험을 가진 풀스택 개발자입니다.",
    url: "https://portfolio-mskim17s-projects.vercel.app",
    siteName: "김민수 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}