export default function Text({ children, as = "p" }) {
  const Tag = as; // h1, h2, p 등 선택 가능
  return <Tag>{children}</Tag>;
}