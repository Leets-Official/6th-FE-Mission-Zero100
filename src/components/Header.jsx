import Text from "./Text";

export default function Header() {
    return (
        <header className="mb-6 text-center">
            <Text as="h1" className="text-2xl sm:text-3xl font-bold">
                TodoMatic
            </Text>
        </header>
    );
}
