Imports System.Data.SqlClient

Public Class OPOperacionForma

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CrearOperacionForma(ByVal cod_empresa As String, ByVal cod_operacion As String, ByVal cod_forma As String, ByVal cod_descripcion As String, ByVal usuario As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SpOpe_CrearOperacionXForma", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", cod_operacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodForma", cod_forma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", cod_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", usuario, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOpeForma", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CodOpeForma").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ActualizarOperacionForma(ByVal cod_empresa As String, ByVal cod_opeForma As String, ByVal cod_operacion As String, ByVal cod_forma As String, ByVal cod_descripcion As String, ByVal usuario As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ActualizarOperacionXForma", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOpeForma", cod_opeForma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", cod_operacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodForma", cod_forma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", cod_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", usuario, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOperacionFormas(ByVal cod_empresa As String, ByVal cod_opeForma As String, ByVal cod_operacion As String, ByVal cod_forma As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarOperacionXForma", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", cod_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOpeForma", IIf(cod_opeForma.Equals(""), Nothing, cod_opeForma), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodOperacion", IIf(cod_operacion.Equals(""), Nothing, cod_operacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodForma", IIf(cod_forma.Equals(""), Nothing, cod_forma), ParameterDirection.Input, 253))
            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarFormas(ByVal cod_forma As String, ByVal cod_sistema As String, ByVal tipo_forma As String, ByVal estado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpSis_ListarFormas", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodForma", cod_forma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodSistema", cod_sistema, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoForm", tipo_forma, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", estado, ParameterDirection.Input, 253))
            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOperaciones(ByVal codEmpresa As String, ByVal codOperacion As String, ByVal codTipoOperacion As String, ByVal estado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpOpe_ListarOperaciones", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", codEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodigoOP", IIf(codOperacion.Equals(""), Nothing, codOperacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodTipoOP", IIf(codTipoOperacion.Equals(""), Nothing, codTipoOperacion), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", estado, ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
