import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

const NavbarComponent = () =>{
    return (
        <Navbar>
            <NavbarBrand>Navbar</NavbarBrand>
            <NavbarContent justify="center" className="hidden sm:flex gap-4">
                <NavbarItem>
                    <Link href="/" color="foreground">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" color="foreground">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/contact" color="foreground">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="hidden sm:flex gap-4">
                <NavbarItem>
                    <Link href="/login" color="foreground">
                        Login
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/register" color="foreground">
                        Register
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavbarComponent;