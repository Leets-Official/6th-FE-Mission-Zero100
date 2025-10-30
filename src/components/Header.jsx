import Text from './Text';

export default function Header() {
  return (
    <header className="mb-6 text-center">
      <Text as="h1" className="text-3xl md:text-4xl font-extrabold block">TodoMatic</Text>
      <Text as="p" className="text-base text-gray-600 mt-3">What needs to be done?</Text>
    </header>
  );
}