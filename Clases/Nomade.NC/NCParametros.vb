Public Class NCParametros

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarParametros(ByVal p_codigo As String, ByVal p_desc As String, Optional ByVal p_filtro As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PARAMETROS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", p_filtro, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarParametrosTodos(ByVal p_FILTRO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PARAMETROS_TODOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", p_FILTRO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarParametros(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_descripcion As String, ByVal p_valor As String, ByVal p_pantalla As String,
                                         ByVal p_descripcion_detallada As String, ByVal p_codigo_sistema As String, ByVal p_user As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PARAMETROS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_valor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PANTALLA", p_pantalla, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_DETA", p_descripcion_detallada, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SIST", p_codigo_sistema, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearParametros(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_descripcion As String, ByVal p_valor As String, ByVal p_pantalla As String,
                                    ByVal p_descripcion_detallada As String, ByVal p_codigo_sistema As String, ByVal p_user As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_PARAMETROS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_valor, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PANTALLA", p_pantalla, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_DETA", p_descripcion_detallada, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SIST", p_codigo_sistema, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))



            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "ok"




            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarParametros(ByVal sCodParametro As String, ByVal sDescripcion As String, Optional ByVal sGrupo As String = "", Optional ByVal sFiltro As String = "") As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpSis_ListarParametros", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodParametro", sCodParametro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Grupo", sGrupo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Filtro", sFiltro, ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            Return oDT

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGetParametro(ByVal sCodParametro As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpSis_GetParametro", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodParametro", sCodParametro, ParameterDirection.Input, 253))

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
