import Text from '../common/Text';

export default function Header() {
  return (
    <header className='text-center mb-6'>
      <Text as='h1' className='text-4xl font-extrabold mb-4'>
        TodoMatic
      </Text>
      <Text as='h2' className='text-xl text-gray-600'>
        What needs to be done?
      </Text>
    </header>
  );
}
