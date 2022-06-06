Imports Microsoft.VisualBasic
Imports System.Web.Compilation
Imports System.CodeDom

<ExpressionPrefix("Code")> _
Public Class CodeExpressionBuilder
    Inherits ExpressionBuilder

    Public Overrides Function GetCodeExpression(entry As BoundPropertyEntry, parsedData As Object, context As ExpressionBuilderContext) As CodeExpression
        Return New CodeSnippetExpression(entry.Expression)
    End Function

End Class
