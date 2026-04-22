import {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // 어떤 크로러에게 허용하는가? -> * = 모든 크롤러에게 허용
        allow: '/', // 허용할 경로 -> / = 모든 경로 허용
        disallow: [ // 허용하지 않을 경로
          '/dashboard',
          '/api/',
          '/_next/', // Next.js의 내부 자원 경로는 크롤링하지 않도록 disallow에 추가하는 것이 일반적입니다.
        ],
      },
      {
        userAgent: 'GPTBot', // ChatGPT의 크롤러에게는 더 엄격한 규칙을 적용
        disallow: '/', // 모든 경로 disallow -> GPTBot은 사이트 전체를 크롤링하지 못하도록 설정
      },
    ],
    sitemap: "https://badak.com/sitemap.xml",
  }
};