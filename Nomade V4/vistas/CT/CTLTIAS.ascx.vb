﻿Imports System.Data
Partial Class vistas_CT_CTLTIAS
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = m.ListarGestionAsientos(String.Empty, String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""NRO_ORDEN"":""" & row("NRO_ORDEN").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("-")
                sb.Replace("},-", "}")
                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            m = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class
