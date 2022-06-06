Public Class NCUbigeo
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Datos_Ubigeo(ByVal p_FTVUBIG_PAIS_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_DATOS_UBIGEO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_PAIS_CODE", p_FTVUBIG_PAIS_CODE, ParameterDirection.Input, 253))
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

    Public Function Listar_Ubigeo(ByVal p_CODE As String, ByVal p_CODIGO_SUNAT As String, ByVal p_CODIGO_ANT As String, ByVal p_NIVEL As Integer, ByVal p_PAIS_CODE As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_UBIGEO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_SUNAT", p_CODIGO_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_ANT", p_CODIGO_ANT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIVEL", p_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAIS_CODE", p_PAIS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
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

    Public Function fnListar_Ubigeo_Depa(ByVal p_CODE_PAIS As String, ByVal p_CODIGO_DEPAR As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_UBIGEO_DEPA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PAIS", p_CODE_PAIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DEPA", p_CODIGO_DEPAR, ParameterDirection.Input, 253))
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

    Public Function fnListar_Ubigeo_Prov(ByVal p_CODIGO_DEPAR As String, ByVal p_CODE_PROV As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_UBIGEO_PROV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DEPA", p_CODIGO_DEPAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PROV", p_CODE_PROV, ParameterDirection.Input, 253))
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

    Public Function fnListar_Ubigeo_Dist(ByVal p_CODIGO As String, ByVal p_CODE_PROV As String, ByVal p_CODIGO_DIST As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_UBIGEO_DIST", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_UBIGEO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PROV", p_CODE_PROV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DIST", p_CODIGO_DIST, ParameterDirection.Input, 253))
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

    Public Function Crear_Ubigeo(ByVal p_FTVUBIG_CODIGO_SUNAT As String, ByVal p_FTVUBIG_CODIGO_ANT As String, ByVal p_FTVUBIG_DESCRIPCION As String,
                                 ByVal p_FTVUBIG_NIVEL As Integer, ByVal p_FTVUBIG_PAIS_CODE As String, ByVal p_FTVUBIG_ESTADO As String, ByVal p_FTVUBIG_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_UBIGEO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_CODIGO_SUNAT", p_FTVUBIG_CODIGO_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_CODIGO_ANT", p_FTVUBIG_CODIGO_ANT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_DESCRIPCION", p_FTVUBIG_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_NIVEL", p_FTVUBIG_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_PAIS_CODE", p_FTVUBIG_PAIS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_ESTADO", p_FTVUBIG_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_USUA_ID", p_FTVUBIG_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Ubigeo(ByVal p_FTVUBIG_CODE As String, ByVal p_FTVUBIG_CODIGO_SUNAT As String, ByVal p_FTVUBIG_CODIGO_ANT As String, ByVal p_FTVUBIG_DESCRIPCION As String,
                                 ByVal p_FTVUBIG_NIVEL As Integer, ByVal p_FTVUBIG_PAIS_CODE As String, ByVal p_FTVUBIG_ESTADO As String, ByVal p_FTVUBIG_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_UBIGEO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_CODE", p_FTVUBIG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_CODIGO_SUNAT", p_FTVUBIG_CODIGO_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_CODIGO_ANT", p_FTVUBIG_CODIGO_ANT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_DESCRIPCION", p_FTVUBIG_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_NIVEL", p_FTVUBIG_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_PAIS_CODE", p_FTVUBIG_PAIS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_ESTADO", p_FTVUBIG_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVUBIG_USUA_ID", p_FTVUBIG_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
