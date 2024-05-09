import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Login from "./Login"


describe("Login page", () => {

    it("should render with required field", () => {
        // Arrange
        render(<Login />)
        expect(screen.getByText("Login")).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument();

        // Act


        // Assert
    })


    it("should have a login form", () => {
        // Test here
    })
})